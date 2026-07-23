// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxt/content',
        'nuxt-og-image',
        'nuxt-llms',
        '@nuxtjs/mcp-toolkit'
    ],

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    content: {
        build: {
            markdown: {
                toc: {
                    searchDepth: 1
                },
                highlight: {
                    langs: [
                        'markdown',
                        'typescript',
                        'javascript',
                        'php',
                        'vue',
                        'css',
                        'bash',
                        'json'
                    ]
                }
            }
        }
    },

    runtimeConfig: {
        githubToken: process.env.GITHUB_TOKEN,
        public: {
            siteUrl: process.env.SITE_URL,
            github: {
                profile: 'https://github.com/EvanSchleret',
                releaseRepositories: [
                    'EvanSchleret/FormForge',
                    'EvanSchleret/FormForgeClient'
                ],
                repositories: [
                    'EvanSchleret/FormForge',
                    'EvanSchleret/FormForgeClient',
                    'EvanSchleret/laravel-typebridge',
                    'EvanSchleret/lara-mjml',
                    'EvanSchleret/laravel-user-presence'
                ]
            }
        }
    },

    routeRules: {
        '/getting-started': { redirect: '/docs/getting-started' },
        '/concepts': { redirect: '/docs/concepts' },
        '/how-do-i': { redirect: '/docs/how-do-i' },
        '/backend': { redirect: '/docs/backend/overview' },
        '/client': { redirect: '/docs/client/overview' },
        '/mcp-ai': { redirect: '/docs/mcp-ai' },
        '/open-source': { redirect: '/docs/open-source' },
        '/community': { redirect: '/docs/open-source' },
        '/community/getting-help': { redirect: '/docs/open-source/getting-help' },
        '/community/roadmaps': { redirect: '/docs/open-source/roadmap' },
        '/community/roadmaps/backend': { redirect: '/docs/open-source/roadmap/backend' },
        '/community/roadmaps/client': { redirect: '/docs/open-source/roadmap/client' },
        '/community/release-notes': { redirect: '/docs/open-source/releases' },
        '/community/**': { redirect: '/docs/open-source' }
    },

    experimental: {
        asyncContext: true
    },

    compatibilityDate: '2024-07-11',

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    },

    icon: {
        provider: 'iconify'
    },

    llms: {
        domain: process.env.SITE_URL,
        title: 'FormForge Wiki',
        description: 'Official documentation for FormForge backend and FormForge Client.',
        full: {
            title: 'FormForge Wiki - Full Documentation',
            description: 'Complete backend and frontend integration reference for FormForge.'
        },
        sections: [
            {
                title: 'Getting Started',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/getting-started%' }
                ]
            },
            {
                title: 'Concepts',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/concepts%' }
                ]
            },
            {
                title: 'Backend',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/backend%' }
                ]
            },
            {
                title: 'Client',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/docs/client%' }
                ]
            }
        ]
    },

    mcp: {
        name: 'formforge',
        version: '1.0.0'
    }
})
