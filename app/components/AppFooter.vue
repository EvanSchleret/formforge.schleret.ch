<script setup lang="ts">
interface FooterLink {
    label: string
    to: string
    icon?: string
    target?: string
}

interface FooterColumn {
    title: string
    links: FooterLink[]
}

interface RepositoryLabelMap {
    [key: string]: string
}

const runtimeConfig = useRuntimeConfig()
const year = new Date().getFullYear()

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

function formatRepositoryLabel(slug: string): string {
    return repositoryLabels[slug] ?? slug
}

const moduleLinks = computed<FooterLink[]>(() => {
    return repositorySlugs.map((slug: string) => ({
        label: formatRepositoryLabel(slug),
        icon: 'i-lucide-package',
        to: `https://github.com/${slug}`,
        target: '_blank'
    }))
})

const columns = computed<FooterColumn[]>(() => [
    {
        title: 'Docs',
        links: [
            { label: 'Getting Started', to: '/docs/getting-started', icon: 'i-lucide-rocket' },
            { label: 'Concepts', to: '/docs/concepts', icon: 'i-lucide-layers-3' },
            { label: 'Backend', to: '/docs/backend/overview', icon: 'i-lucide-database' },
            { label: 'Client', to: '/docs/client/overview', icon: 'i-lucide-monitor' },
            { label: 'MCP / AI', to: '/docs/mcp-ai', icon: 'i-lucide-bot' },
            { label: 'Open source', to: '/docs/open-source', icon: 'i-lucide-git-pull-request' }
        ]
    },
    {
        title: 'Modules',
        links: moduleLinks.value
    },
    {
        title: 'Resources',
        links: [
            {
                label: 'Packagist',
                to: 'https://packagist.org/packages/evanschleret/formforge',
                icon: 'i-lucide-box',
                target: '_blank'
            },
            {
                label: 'NPM',
                to: 'https://www.npmjs.com/package/@evanschleret/formforgeclient',
                icon: 'i-lucide-box',
                target: '_blank'
            },
            {
                label: 'GitHub Profile',
                to: githubProfile,
                icon: 'i-lucide-github',
                target: '_blank'
            }
        ]
    }
])

</script>

<template>
    <footer class="border-t border-default bg-elevated/30">
        <UContainer class="py-12 lg:py-16">
            <div class="grid gap-10 md:grid-cols-3">
                <div
                    v-for="column in columns"
                    :key="column.title"
                    class="space-y-4"
                >
                    <p class="text-sm font-semibold text-toned">
                        {{ column.title }}
                    </p>

                    <div class="flex flex-col gap-2">
                        <UButton
                            v-for="link in column.links"
                            :key="`${column.title}-${link.label}`"
                            color="neutral"
                            variant="link"
                            :icon="link.icon"
                            :to="link.to"
                            :target="link.target"
                            class="justify-start px-0"
                        >
                            {{ link.label }}
                        </UButton>
                    </div>
                </div>

            </div>
        </UContainer>

        <div class="mt-10 border-t border-default">
            <UContainer class="py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p class="text-sm text-muted">
                    © {{ year }} Evan Schleret · FormForge
                </p>

                <div class="flex items-center gap-1">
                    <UButton
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-twitter"
                        to="https://twitter.com/EvanSchleret"
                        target="_blank"
                        aria-label="Twitter profile"
                    />
                    <UButton
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-linkedin"
                        to="https://www.linkedin.com/in/evanschleret"
                        target="_blank"
                        aria-label="LinkedIn profile"
                    />
                    <UButton
                        color="neutral"
                        variant="ghost"
                        icon="i-lucide-github"
                        :to="githubProfile"
                        target="_blank"
                        aria-label="GitHub profile"
                    />
                    <UColorModeButton />
                </div>
            </UContainer>
        </div>
    </footer>
</template>
