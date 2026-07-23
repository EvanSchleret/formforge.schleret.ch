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
    'concepts': 'i-lucide-layers-3',
    'how-do-i': 'i-lucide-circle-help',
    'backend': 'i-lucide-database',
    'client': 'i-lucide-monitor',
    'mcp-ai': 'i-lucide-bot',
    'open-source': 'i-lucide-git-pull-request'
}

const defaultSectionPaths: Record<string, string> = {
    'getting-started': '/docs/getting-started',
    'concepts': '/docs/concepts',
    'how-do-i': '/docs/how-do-i',
    'backend': '/docs/backend/overview',
    'client': '/docs/client/overview',
    'mcp-ai': '/docs/mcp-ai',
    'open-source': '/docs/open-source'
}

const sectionOrder = [
    'getting-started',
    'concepts',
    'how-do-i',
    'backend',
    'client',
    'mcp-ai',
    'open-source'
]

const sectionChildOrder: Record<string, string[]> = {
    'backend': ['overview', 'forms', 'http-api', 'operations'],
    'client': ['overview', 'composables', 'components', 'reference'],
    'mcp-ai': ['mcp-ai'],
    'open-source': ['', 'roadmap', 'releases', 'contributing', 'getting-help', 'security']
}

function hasPath(item: ContentNavigationItem): item is ContentNavigationItem & { path: string } {
    return typeof item.path === 'string' && item.path.length > 0 && item.path !== '/'
}

function sectionKeyFromPath(path: string | undefined): string {
    if (typeof path !== 'string' || path.length === 0) {
        return ''
    }

    const segments = path.split('/').filter(Boolean)
    return segments[0] === 'docs' ? (segments[1] ?? '') : (segments[0] ?? '')
}

function sectionChildKeyFromPath(path: string | undefined): string {
    if (typeof path !== 'string' || path.length === 0) {
        return ''
    }

    const segments = path.split('/').filter(Boolean)
    return segments[0] === 'docs' ? (segments[2] ?? '') : (segments[1] ?? '')
}

function normalizeNavigationItem(item: ContentNavigationItem, isSection: boolean = false): ContentNavigationItem | null {
    const children = (item.children ?? [])
        .map(child => normalizeNavigationItem(child))
        .filter((child): child is ContentNavigationItem => child !== null)

    const currentPath = hasPath(item) ? item.path : undefined
    const resolvedPath = typeof currentPath === 'string' && !currentPath.endsWith('/.navigation')
        ? currentPath
        : (children.find(hasPath)?.path ?? undefined)

    if (typeof resolvedPath !== 'string' || resolvedPath.length === 0) {
        return null
    }

    const sectionKey = sectionKeyFromPath(resolvedPath)
    const sectionPath = isSection ? (defaultSectionPaths[sectionKey] ?? `/docs/${sectionKey}`) : resolvedPath
    const icon = isSection ? defaultSectionIcons[sectionKey] : undefined

    return {
        ...item,
        ...(icon !== undefined ? { icon } : {}),
        path: sectionPath,
        children
    }
}

const normalizedNavigation = computed<ContentNavigationItem[]>(() => {
    const docsRoot = (navigation?.value ?? []).find(item => hasPath(item) && (item.path === '/docs' || item.path === '/docs/.navigation'))
    const source = docsRoot?.children ?? navigation?.value ?? []

    return source
        .map(item => normalizeNavigationItem(item, true))
        .filter((item): item is ContentNavigationItem => item !== null)
        .sort((a, b) => {
            const aKey = sectionKeyFromPath(a.path)
            const bKey = sectionKeyFromPath(b.path)
            const aIndex = sectionOrder.indexOf(aKey)
            const bIndex = sectionOrder.indexOf(bKey)
            const aWeight = aIndex === -1 ? Number.POSITIVE_INFINITY : aIndex
            const bWeight = bIndex === -1 ? Number.POSITIVE_INFINITY : bIndex

            if (aWeight !== bWeight) {
                return aWeight - bWeight
            }

            return a.title.localeCompare(b.title)
        })
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
            <UContainer>
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
