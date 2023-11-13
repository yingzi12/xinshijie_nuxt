<script setup lang="ts">
useSeoMeta({
  titleTemplate: '心世界 | %s',
  description: '心世界,世界观构建，角色开发，故事写作指南，创意写作，文学创作资源，叙事结构，虚构世界设计，写作灵感，创作社区,小说创作技巧,世界观,故事,小说,设定,同人,世界观,背景,world view, story, novel, setting, fan, world view, background',
  ogImage: 'https://hn.nuxt.space/cover.jpg',
  ogImageAlt: 'Nuxt Hackernews',
  twitterImage: 'https://hn.nuxt.space/cover.jpg',
  twitterSite: '@nuxt_js',
  twitterCreator: '@nuxt_js',
  twitterCard: 'summary_large_image',
})
useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
