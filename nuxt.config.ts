// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
        '@nuxt/image',
        '@nuxt/ui',
        '@nuxt/content',
        'nuxt-og-image',
        'nuxt-llms',
        '@nuxtjs/mcp-toolkit',
        '@vercel/analytics'
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
        '/**': { prerender: true },
        '/mcp/**': { prerender: false }
    },

    experimental: {
        asyncContext: true
    },

    compatibilityDate: '2024-07-11',

    nitro: {
        prerender: {
            routes: [
                '/'
            ],
            crawlLinks: false,
            autoSubfolderIndex: false
        }
    },

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
                    { field: 'path', operator: 'LIKE', value: '/getting-started%' }
                ]
            },
            {
                title: 'Backend',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/backend%' }
                ]
            },
            {
                title: 'Client',
                contentCollection: 'docs',
                contentFilters: [
                    { field: 'path', operator: 'LIKE', value: '/client%' }
                ]
            }
        ]
    },

    mcp: {
        name: 'formforge',
        version: '1.0.0'
    }
})
