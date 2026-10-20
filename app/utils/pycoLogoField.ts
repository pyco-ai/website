// The moving Pyco logo: a dithered dot field that pauses, gathers its own dots into the word,
// holds, then sends every dot back to the exact spot it left before drifting on.
// No dot is ever added, faded or removed.

export interface PycoLogoFieldOptions {
  word?: string
  color?: string
  background?: string
  font?: string
  cellSize?: number
  dotSize?: number
  reducedMotion?: boolean
}

const DRIFT = 5.4
const FORM = 4.4
const HOLD = 2.4
const DISSOLVE = 3.8
const CYCLE = DRIFT + FORM + HOLD + DISSOLVE
const RAMP = 0.9
const MOVE = DRIFT - RAMP // field time gained per cycle
const STEP = 1 / 60

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => (v + 0.5) / 16)
const clamp = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (x: number) => {
  x = clamp(x)
  return x * x * (3 - 2 * x)
}

function rand(seed: number) {
  let s = seed >>> 0 || 1
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

function shuffle<T>(a: T[], r: () => number): T[] {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

// 2D simplex noise (Gustavson)
const GRAD = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
const PERM = (() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  let seed = 7
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647
    const j = seed % (i + 1)
    ;[p[i], p[j]] = [p[j]!, p[i]!]
  }
  const perm = new Uint8Array(512)
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]!
  return perm
})()
const F2 = 0.5 * (Math.sqrt(3) - 1)
const G2 = (3 - Math.sqrt(3)) / 6

function simplex(x: number, y: number) {
  const s = (x + y) * F2
  const i = Math.floor(x + s)
  const j = Math.floor(y + s)
  const t = (i + j) * G2
  const x0 = x - (i - t)
  const y0 = y - (j - t)
  const i1 = x0 > y0 ? 1 : 0
  const j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1 + 2 * G2
  const y2 = y0 - 1 + 2 * G2
  const ii = i & 255
  const jj = j & 255
  const corners: [number, number, number][] = [
    [x0, y0, PERM[ii + PERM[jj]!]!],
    [x1, y1, PERM[ii + i1 + PERM[jj + j1]!]!],
    [x2, y2, PERM[ii + 1 + PERM[jj + 1]!]!],
  ]
  let n = 0
  for (const [dx, dy, gi] of corners) {
    let tt = 0.5 - dx * dx - dy * dy
    if (tt > 0) {
      tt *= tt
      const g = GRAD[gi & 7]!
      n += tt * tt * (g[0]! * dx + g[1]! * dy)
    }
  }
  return 70 * n
}

// Field time slows to a stop before the word forms and stays still until every dot is home
function fieldTime(t: number) {
  const cycle = Math.floor(t / CYCLE)
  const lt = t - cycle * CYCLE
  let local: number
  if (lt < RAMP) local = (0.5 * lt * lt) / RAMP
  else if (lt < DRIFT - RAMP) local = RAMP / 2 + (lt - RAMP)
  else if (lt < DRIFT) {
    const u = lt - (DRIFT - RAMP)
    local = RAMP / 2 + (DRIFT - 2 * RAMP) + u - (0.5 * u * u) / RAMP
  }
  else local = MOVE
  return cycle * MOVE + local
}

function field(x: number, y: number, ft: number) {
  const d = ft * 0.14
  return clamp((simplex(x / 60 + d, y / 60 - d * 0.6) * 0.5 + 0.5 - 0.45) * 1.9)
}

// Curl of a noise field: a smooth current the travelling dots ride on
function flow(x: number, y: number, t: number): [number, number] {
  const s = 1 / 220
  const e = 0.5
  const z = t * 0.12
  const n1 = simplex(x * s + z, (y + e) * s)
  const n2 = simplex(x * s + z, (y - e) * s)
  const n3 = simplex((x + e) * s + z, y * s)
  const n4 = simplex((x - e) * s + z, y * s)
  return [((n1 - n2) / (2 * e)) * 2600, (-(n3 - n4) / (2 * e)) * 2600]
}

interface Dot {
  src: number
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  pullAt: number
  pullLen: number
  freeAt: number
  home: boolean
}

export function mountPycoLogoField(canvas: HTMLCanvasElement, options: PycoLogoFieldOptions = {}) {
  const word = options.word ?? 'pyco'
  const color = options.color ?? '#6685FF'
  const background = options.background ?? '#FFFFFF'
  const font = options.font ?? '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  const CELL = options.cellSize ?? 4
  const DOT = options.dotSize ?? 2.5
  const ctx = canvas.getContext('2d')!

  let W = 0
  let H = 0
  let cols = 0
  let rows = 0
  let targets: number[] = []
  let zone = new Uint8Array(0)
  let bx0 = 0
  let bx1 = 0
  let by0 = 0
  let by1 = 0
  let dots: Dot[] = []
  let simT = 0
  let cycleNow = -1
  let raf = 0

  const isOn = (i: number, ft: number) => {
    const x = i % cols
    const y = (i / cols) | 0
    return field(x, y, ft) > BAYER[(y & 3) * 4 + (x & 3)]!
  }

  function layout() {
    const r = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    W = r.width
    H = r.height
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cols = Math.max(1, Math.floor(W / CELL))
    rows = Math.max(1, Math.floor(H / CELL))

    // Trace the word at grid resolution
    const c = document.createElement('canvas')
    c.width = cols
    c.height = rows
    const m = c.getContext('2d')!
    m.fillStyle = '#000'
    m.textAlign = 'center'
    m.textBaseline = 'middle'
    let px = rows * 0.62
    m.font = `400 ${px}px ${font}`
    const w = m.measureText(word).width
    if (w > cols * 0.5) {
      px *= (cols * 0.5) / w
      m.font = `400 ${px}px ${font}`
    }
    m.fillText(word, cols / 2, rows * 0.5)
    const d = m.getImageData(0, 0, cols, rows).data
    targets = []
    for (let i = 0; i < cols * rows; i++) if (d[i * 4 + 3]! > 110) targets.push(i)

    // A soft oval clear area around the word
    bx0 = cols; bx1 = 0; by0 = rows; by1 = 0
    for (const i of targets) {
      const x = i % cols
      const y = (i / cols) | 0
      bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x); by0 = Math.min(by0, y); by1 = Math.max(by1, y)
    }
    const PAD = 5
    bx0 -= PAD; bx1 += PAD; by0 -= PAD; by1 += PAD
    const ecx = (bx0 + bx1) / 2
    const ecy = (by0 + by1) / 2
    const erx = ((bx1 - bx0) / 2) * 1.1
    const ery = ((by1 - by0) / 2) * 1.45
    zone = new Uint8Array(cols * rows)
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++)
        if (((x - ecx) / erx) ** 2 + ((y - ecy) / ery) ** 2 <= 1) zone[y * cols + x] = 1
    cycleNow = -1
  }

  function startCycle(cycle: number) {
    const r = rand(cycle * 7919 + 17)
    const ft = fieldTime(cycle * CYCLE + DRIFT)
    const on: number[] = []
    for (let i = 0; i < cols * rows; i++) if (isOn(i, ft)) on.push(i)
    const inZone = shuffle(on.filter(i => zone[i]), r)
    const outside = shuffle(on.filter(i => !zone[i]), r)

    // Every dot already around the word goes somewhere: into a letter, or nudged outside the clear area
    let tg = shuffle(targets.slice(), r)
    const need = tg.length
    const letterSrc = inZone.slice(0, need).concat(outside.slice(0, Math.max(0, need - inZone.length)))
    if (letterSrc.length < need) tg = tg.slice(0, letterSrc.length) // a thin field gives sparser letters, never new dots
    const spare = inZone.slice(need)
    const taken = new Uint8Array(cols * rows)
    for (const i of on) taken[i] = 1
    const cxc = (bx0 + bx1) / 2
    const cyc = (by0 + by1) / 2

    const pushTo = (i: number) => {
      const x = i % cols
      const y = (i / cols) | 0
      let dx = x - cxc
      let dy = (y - cyc) * 2.2
      const L = Math.hypot(dx, dy) || 1
      dx /= L
      dy /= L
      let extra = -1
      for (let s = 1; s < 500; s++) {
        const nx = Math.round(x + dx * s)
        const ny = Math.round(y + dy * s)
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) break
        if (zone[ny * cols + nx]) continue
        if (extra < 0) extra = 1 + Math.floor(r() * 16) // scatter a random distance past the edge
        if (--extra > 0) continue
        for (let k = 0; k < 12; k++) {
          const jx = nx + Math.round((r() - 0.5) * 6)
          const jy = ny + Math.round((r() - 0.5) * 6)
          if (jx < 0 || jy < 0 || jx >= cols || jy >= rows) continue
          const jj = jy * cols + jx
          if (!zone[jj] && !taken[jj]) {
            taken[jj] = 1
            return jj
          }
        }
        extra = 1
      }
      return i
    }

    const mk = (src: number, dst: number): Dot => ({
      src,
      hx: (src % cols) * CELL,
      hy: ((src / cols) | 0) * CELL,
      x: (src % cols) * CELL,
      y: ((src / cols) | 0) * CELL,
      vx: 0,
      vy: 0,
      tx: (dst % cols) * CELL,
      ty: ((dst / cols) | 0) * CELL,
      pullAt: r() * 2.0,
      pullLen: 1.5 + r() * 1.0,
      freeAt: r() * 1.0,
      home: false,
    })
    dots = letterSrc.slice(0, tg.length).map((s, i) => mk(s, tg[i]!)).concat(spare.map(s => mk(s, pushTo(s))))
    simT = cycle * CYCLE + DRIFT
    cycleNow = cycle
  }

  function step(t: number) {
    const lt = t - cycleNow * CYCLE - DRIFT
    for (const q of dots) {
      if (q.home) continue
      const [fx, fy] = flow(q.x, q.y, t)
      let dvx: number
      let dvy: number
      let resp: number
      if (lt < FORM + HOLD) {
        // carried by the current, with a pull toward the letter that grows until the dot settles
        const a = smooth((lt - q.pullAt) / q.pullLen)
        const gain = 2.6 + 6 * a * a
        dvx = fx * (1 - a) + (q.tx - q.x) * gain * a
        dvy = fy * (1 - a) + (q.ty - q.y) * gain * a
        resp = Math.min(1, STEP * (2.2 + 6 * a))
      }
      else {
        const od = lt - FORM - HOLD
        const rel = smooth((od - q.freeAt) / 0.8) // letting go of the letter
        const b = smooth((od - q.freeAt - 0.5) / 1.7) // then drawn back to where it came from
        const g = 2.6 + 6 * b * b
        dvx = (q.tx - q.x) * 6 * (1 - rel) + fx * rel * (1 - b) + (q.hx - q.x) * g * b
        dvy = (q.ty - q.y) * 6 * (1 - rel) + fy * rel * (1 - b) + (q.hy - q.y) * g * b
        resp = Math.min(1, STEP * (2.2 + 6 * Math.max(b, 1 - rel)))
        if (b > 0.995 && Math.hypot(q.hx - q.x, q.hy - q.y) < 0.6) {
          q.home = true
          continue
        }
      }
      q.vx += (dvx - q.vx) * resp
      q.vy += (dvy - q.vy) * resp
      q.x += q.vx * STEP
      q.y += q.vy * STEP
    }
  }

  function draw(t: number) {
    const cycle = Math.floor(t / CYCLE)
    const lt = t - cycle * CYCLE
    const active = lt >= DRIFT
    if (active && cycle !== cycleNow) startCycle(cycle)
    if (active) {
      let n = 0
      while (simT < t && n++ < 900) {
        step(simT)
        simT += STEP
      }
    }
    if (active && lt > CYCLE - 0.15) for (const q of dots) q.home = true // everyone is home before the field moves again

    const ft = fieldTime(t)
    const away = new Uint8Array(cols * rows)
    if (active) for (const q of dots) if (!q.home) away[q.src] = 1

    ctx.fillStyle = background
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = color
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        if (away[i]) continue
        if (field(x, y, ft) > BAYER[(y & 3) * 4 + (x & 3)]!) ctx.fillRect(x * CELL, y * CELL, DOT, DOT)
      }
    if (active) for (const q of dots) if (!q.home) ctx.fillRect(q.x, q.y, DOT, DOT)
  }

  const t0 = performance.now()
  // With reduced motion, show the word fully formed and stay still
  const STILL = DRIFT + FORM + HOLD / 2

  function frame(now: number) {
    draw((now - t0) / 1000)
    raf = requestAnimationFrame(frame)
  }

  function start() {
    layout()
    if (options.reducedMotion) draw(STILL)
    else raf = requestAnimationFrame(frame)
  }

  const ro = new ResizeObserver(() => {
    layout()
    if (options.reducedMotion) draw(STILL)
  })
  ro.observe(canvas)

  // Wait for the web font, or the word is traced in a fallback font
  if (document.fonts?.load) document.fonts.load(`400 40px ${font}`).catch(() => {}).then(start)
  else start()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
  }
}
