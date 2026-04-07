<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('landing').path('/').first())
if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
const socialImage = 'https://raw.githubusercontent.com/EvanSchleret/FormForge/main/.github/assets/banner.png'

useSeoMeta({
    titleTemplate: '',
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: socialImage,
    twitterImage: socialImage
})
</script>

<template>
    <ContentRenderer
        v-if="page"
        :value="page"
        :prose="false"
    />
</template>
