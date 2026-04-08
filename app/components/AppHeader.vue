<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

interface GithubStarsResponse {
    total: number
}

interface RepositoryLabelMap {
    [key: string]: string
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

const githubConfig = runtimeConfig.public.github
const githubProfile = githubConfig.profile
const repositorySlugs = githubConfig.repositories

const repositoryLabels: RepositoryLabelMap = {
    'EvanSchleret/FormForge': 'FormForge Backend',
    'EvanSchleret/FormForgeClient': 'FormForge Client',
    'EvanSchleret/laravel-typebridge': 'Laravel Typebridge',
    'EvanSchleret/lara-mjml': 'Lara MJML',
    'EvanSchleret/laravel-user-presence': 'Laravel User Presence'
}

function sectionFromPath(path: string): string {
    return path.split('/').filter(Boolean)[0] ?? ''
}

function isSectionActive(section: string | string[]): boolean {
    if (Array.isArray(section)) {
        if (section.some(s => isSectionActive(s))) {
            return true
        }
    }
    return sectionFromPath(route.path) === section
}

function formatRepositoryLabel(slug: string): string {
    return repositoryLabels[slug] ?? slug
}

const moduleItems = computed<NavigationMenuItem[]>(() => {
    return repositorySlugs.map((slug: string) => ({
        label: formatRepositoryLabel(slug),
        icon: 'i-lucide-package',
        to: `https://github.com/${slug}`,
        target: '_blank'
    }))
})

const navigationItems = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Docs',
        icon: 'i-lucide-book-open',
        to: '/getting-started',
        active: isSectionActive(['getting-started', 'backend', 'client'])
    },
    {
        label: 'AI',
        icon: 'i-lucide-bot',
        to: '/mcp-ai',
        active: isSectionActive('mcp-ai')
    },
    {
        label: 'Community',
        icon: 'i-lucide-messages-square',
        to: '/community/getting-help',
        active: isSectionActive('community')
    },
    {
        label: 'Modules',
        icon: 'i-lucide-box',
        children: moduleItems.value
    },
    {
        label: 'Resources',
        icon: 'i-lucide-compass',
        children: [
            {
                label: 'Packagist',
                icon: 'i-lucide-box',
                to: 'https://packagist.org/packages/evanschleret/formforge',
                target: '_blank'
            },
            {
                label: 'NPM',
                icon: 'i-lucide-box',
                to: 'https://www.npmjs.com/package/@evanschleret/formforgeclient',
                target: '_blank'
            },
            {
                label: 'MCP Endpoint',
                icon: 'i-lucide-plug',
                to: 'https://formforge.schleret.ch/mcp',
                target: '_blank'
            }
        ]
    }
])

const { data: githubStars } = await useAsyncData<GithubStarsResponse>('github-stars', () => {
    return $fetch<GithubStarsResponse>('/api/github-stars')
}, {
    default: () => ({ total: 0 })
})

const formattedStars = computed<string>(() => {
    const value = githubStars.value?.total ?? 0
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1
    }).format(value)
})
</script>

<template>
    <UHeader
        :ui="{
            root: 'border-b border-default bg-default/90 backdrop-blur',
            left: 'min-w-0 lg:flex-1',
            center: 'hidden lg:flex min-w-0',
            right: 'items-center gap-1.5 lg:flex-1 lg:justify-end',
            body: 'fixed'
        }"
    >
        <template #left>
            <NuxtLink
                to="/"
                class="flex items-center gap-2"
            >
                <UIcon
                    name="i-lucide-shield-check"
                    class="size-5 text-primary"
                />
                <span class="text-base font-semibold tracking-tight text-highlighted">
                    FormForge
                </span>
            </NuxtLink>
        </template>

        <template #default>
            <UNavigationMenu
                color="neutral"
                variant="link"
                :items="navigationItems"
                class="hidden lg:flex"
                :ui="{
                    list: 'gap-1 xl:gap-1.5 flex-nowrap',
                    item: 'shrink-0',
                    link: 'px-3 py-2 text-sm font-medium',
                    linkLabel: '!max-w-none !overflow-visible !text-clip !whitespace-nowrap'
                }"
            />
        </template>

        <template #right>
            <UContentSearchButton
                :collapsed="true"
                color="neutral"
                variant="ghost"
            />

            <UColorModeButton />

            <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-github"
                :to="githubProfile"
                target="_blank"
                :label="formattedStars"
            />
        </template>

        <template #body>
            <UNavigationMenu
                color="neutral"
                variant="link"
                :items="navigationItems"
                highlight
                orientation="vertical"
                class="-mx-2.5 lg:hidden"
            />
        </template>
    </UHeader>
</template>
