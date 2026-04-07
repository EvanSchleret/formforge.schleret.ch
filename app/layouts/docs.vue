<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

interface SectionLink {
    label: string
    to: string
    icon?: string
    active?: boolean
}

const route = useRoute()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const defaultSectionIcons: Record<string, string> = {
    'getting-started': 'i-lucide-rocket',
    'backend': 'i-lucide-database',
    'client': 'i-lucide-monitor',
    'mcp-ai': 'i-lucide-bot',
    'community': 'i-lucide-messages-square'
}

const defaultSectionPaths: Record<string, string> = {
    'getting-started': '/getting-started',
    'backend': '/backend/overview',
    'client': '/client/overview',
    'mcp-ai': '/mcp-ai',
    'community': '/community/getting-help'
}

const sectionChildOrder: Record<string, string[]> = {
    'backend': ['overview', 'forms', 'http-api', 'operations'],
    'client': ['overview', 'composables', 'components', 'reference'],
    'mcp-ai': ['mcp-ai'],
    'community': ['getting-help', 'backend-roadmap', 'client-roadmap']
}

function hasPath(item: ContentNavigationItem): item is ContentNavigationItem & { path: string } {
    return typeof item.path === 'string' && item.path.length > 0 && item.path !== '/'
}

function sectionKeyFromPath(path: string | undefined): string {
    if (typeof path !== 'string' || path.length === 0) {
        return ''
    }

    return path.split('/').filter(Boolean)[0] ?? ''
}

function sectionChildKeyFromPath(path: string | undefined): string {
    if (typeof path !== 'string' || path.length === 0) {
        return ''
    }

    return path.split('/').filter(Boolean)[1] ?? ''
}

function normalizeNavigationItem(item: ContentNavigationItem, depth: number = 0): ContentNavigationItem | null {
    const children = (item.children ?? [])
        .map(child => normalizeNavigationItem(child, depth + 1))
        .filter((child): child is ContentNavigationItem => child !== null)

    const currentPath = hasPath(item) ? item.path : undefined
    const resolvedPath = typeof currentPath === 'string' && !currentPath.endsWith('/.navigation')
        ? currentPath
        : (children.find(hasPath)?.path ?? undefined)

    if (typeof resolvedPath !== 'string' || resolvedPath.length === 0) {
        return null
    }

    const sectionKey = sectionKeyFromPath(resolvedPath)
    const sectionPath = depth === 0
        ? (defaultSectionPaths[sectionKey] ?? resolvedPath)
        : resolvedPath
    const icon = typeof item.icon === 'string' && item.icon.startsWith('i-lucide-')
        ? item.icon
        : defaultSectionIcons[sectionKey]

    return {
        ...item,
        icon,
        path: sectionPath,
        children
    }
}

const normalizedNavigation = computed<ContentNavigationItem[]>(() => {
    return (navigation?.value ?? [])
        .map(item => normalizeNavigationItem(item))
        .filter((item): item is ContentNavigationItem => item !== null)
})

const currentSectionKey = computed(() => sectionKeyFromPath(route.path))

const sectionLinks = computed<SectionLink[]>(() => {
    return normalizedNavigation.value
        .filter(hasPath)
        .map(item => ({
            label: item.title,
            to: item.path,
            icon: typeof item.icon === 'string' ? item.icon : defaultSectionIcons[sectionKeyFromPath(item.path)],
            active: sectionKeyFromPath(item.path) === currentSectionKey.value
        }))
})

const currentSectionNavigation = computed<ContentNavigationItem[]>(() => {
    const currentSection = normalizedNavigation.value.find((item) => {
        if (!hasPath(item)) {
            return false
        }

        return sectionKeyFromPath(item.path) === currentSectionKey.value
    })

    if (currentSection) {
        if (Array.isArray(currentSection.children) && currentSection.children.length > 0) {
            const order = sectionChildOrder[currentSectionKey.value] ?? []

            if (order.length === 0) {
                return currentSection.children
            }

            return [...currentSection.children].sort((a, b) => {
                const aKey = sectionChildKeyFromPath(a.path)
                const bKey = sectionChildKeyFromPath(b.path)
                const aIndex = order.indexOf(aKey)
                const bIndex = order.indexOf(bKey)
                const aWeight = aIndex === -1 ? Number.POSITIVE_INFINITY : aIndex
                const bWeight = bIndex === -1 ? Number.POSITIVE_INFINITY : bIndex

                if (aWeight !== bWeight) {
                    return aWeight - bWeight
                }

                return a.title.localeCompare(b.title)
            })
        }

        return [currentSection]
    }

    return normalizedNavigation.value
})
</script>

<template>
    <div>
        <div
            v-if="sectionLinks.length > 0"
            class="w-full border-y border-default bg-elevated/40"
        >
            <UContainer class="py-1">
                <UNavigationMenu
                    color="neutral"
                    variant="link"
                    :items="sectionLinks"
                    class="w-full"
                    highlight
                />
            </UContainer>
        </div>

        <UContainer class="py-4">
            <UPage>
                <template #left>
                    <UPageAside>
                        <UContentNavigation
                            highlight
                            :navigation="currentSectionNavigation"
                        />
                    </UPageAside>
                </template>

                <slot />
            </UPage>
        </UContainer>
    </div>
</template>
