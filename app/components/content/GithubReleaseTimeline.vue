<script setup lang="ts">
interface GithubRelease {
    repository: string
    tag_name: string
    name: string
    body: string
    html_url: string
    published_at: string | null
    prerelease: boolean
}

interface ReleaseTimelineItem {
    title: string
    date: string
    description: string
    url: string
    icon: string
}

const { data: releases, status, error } = await useFetch<GithubRelease[]>('/api/github-releases')

const items = computed<ReleaseTimelineItem[]>(() => (releases.value ?? []).map(release => ({
    title: `${release.name || release.tag_name} · ${release.repository}`,
    date: release.published_at
        ? new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(release.published_at))
        : 'Unpublished',
    description: release.body || 'No release notes were published for this release.',
    url: release.html_url,
    icon: release.prerelease ? 'i-lucide-flask-conical' : 'i-lucide-tag'
})))
</script>

<template>
    <div
        v-if="status === 'pending'"
        class="flex items-center gap-2 text-muted"
    >
        <UIcon
            name="i-lucide-loader-circle"
            class="size-4 animate-spin"
        />
        Loading releases…
    </div>

    <UAlert
        v-else-if="error"
        color="error"
        variant="subtle"
        icon="i-lucide-circle-alert"
        title="GitHub releases could not be loaded."
        description="Open the project repository to read the latest release information."
    />

    <UTimeline
        v-else
        :items="items"
        color="primary"
        size="lg"
    >
        <template #date="{ item }">
            {{ item.date }}
        </template>
        <template #title="{ item }">
            <UButton
                :to="item.url"
                :label="item.title"
                variant="link"
                color="neutral"
                class="px-0 font-semibold"
                target="_blank"
            />
        </template>
        <template #description="{ item }">
            <MDC
                :value="item.description"
                class="prose prose-sm max-w-none"
            />
        </template>
    </UTimeline>
</template>
