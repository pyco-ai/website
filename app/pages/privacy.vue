<script setup lang="ts">
const description = 'How Pyco handles data and protects the privacy of visitors to pyco.ai.'

useSeoMeta({
  title: 'Privacy',
  description,
  ogTitle: 'Privacy',
  ogDescription: description,
})

const updated = 'July 2026'

const sections: { heading: string; body: string }[] = [
  {
    heading: 'What we collect',
    body: 'Nothing. This site is a set of static files. There are no accounts, no forms, no analytics, and no tracking scripts. We do not set cookies, and nothing you do here is recorded by us.',
  },
  {
    heading: 'Server logs',
    body: 'Our hosting provider may keep short-lived request logs, including IP address, user agent, and the URL requested, as a normal part of serving and protecting the site. We do not use those logs to build a profile of you, and we do not combine them with anything else.',
  },
  {
    heading: 'If you email us',
    body: 'We receive whatever you send, including your address, and keep it so we can reply and keep track of the conversation. We do not add you to a mailing list and we do not pass it on.',
  },
  {
    heading: 'Third parties',
    body: 'We do not sell or share personal information. We have no advertising partners and run no third-party scripts on this site.',
  },
  {
    heading: 'Your rights',
    body: 'If you are in the EU, UK, or California, you have the right to ask what personal information we hold about you, to have it corrected, and to have it deleted. Since the only thing we are likely to hold is an email you sent us, such a request is usually quick to honour; write to the address below.',
  },
  {
    heading: 'Changes',
    body: 'If this policy changes we will update the date at the top. Material changes to what we collect will be described here rather than made quietly.',
  },
]
</script>

<template>
  <div>
    <div class="mb-12">
      <h2 class="text-lg font-normal">PRIVACY</h2>
      <p class="opacity-60">Last updated {{ updated }}</p>
    </div>

    <div class="max-w-prose space-y-6">
      <div v-for="s in sections" :key="s.heading">
        <h3 class="font-normal">{{ s.heading }}</h3>
        <p class="mt-1 leading-relaxed opacity-80">{{ s.body }}</p>
      </div>

      <div>
        <h3 class="font-normal">Contact</h3>
        <p class="mt-1 leading-relaxed opacity-80">
          Questions about this policy go to
          <a href="mailto:seth@pyco.ai" class="underline hover:no-underline">seth@pyco.ai</a>.
        </p>
      </div>
    </div>
  </div>
</template>
