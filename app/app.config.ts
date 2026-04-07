export default defineAppConfig({
    ui: {
        colors: {
            primary: 'green',
            neutral: 'slate'
        },
        footer: {
            slots: {
                root: 'border-t border-default',
                left: 'text-sm text-muted'
            }
        }
    },
    seo: {
        siteName: 'FormForge Wiki'
    },
    header: {
        title: 'FormForge Wiki',
        to: '/',
        logo: {
            alt: '',
            light: '',
            dark: ''
        },
        search: true,
        colorMode: true,
        links: [
            {
                'label': 'Backend',
                'icon': 'i-lucide-github',
                'to': 'https://github.com/EvanSchleret/FormForge',
                'target': '_blank',
                'aria-label': 'FormForge backend repository'
            },
            {
                'label': 'Client',
                'icon': 'i-lucide-github',
                'to': 'https://github.com/EvanSchleret/FormForgeClient',
                'target': '_blank',
                'aria-label': 'FormForge Client repository'
            }
        ]
    },
    footer: {
        credits: 'Evan Schleret · FormForge',
        colorMode: false,
        links: [
            {
                'label': 'Backend package',
                'icon': 'i-lucide-github',
                'to': 'https://github.com/EvanSchleret/FormForge',
                'target': '_blank',
                'aria-label': 'FormForge backend repository'
            },
            {
                'label': 'Client package',
                'icon': 'i-lucide-github',
                'to': 'https://github.com/EvanSchleret/FormForgeClient',
                'target': '_blank',
                'aria-label': 'FormForge Client repository'
            },
            {
                'label': 'Docs source',
                'icon': 'i-lucide-github',
                'to': 'https://github.com/EvanSchleret/formforge.schleret.ch',
                'target': '_blank',
                'aria-label': 'FormForge wiki source repository'
            }
        ]
    },
    toc: {
        title: 'On this page',
        bottom: {
            title: 'Resources',
            edit: 'https://github.com/EvanSchleret/formforge.schleret.ch/edit/main/content',
            links: [
                {
                    icon: 'i-lucide-box',
                    label: 'Backend package',
                    to: 'https://packagist.org/packages/evanschleret/formforge',
                    target: '_blank'
                },
                {
                    icon: 'i-lucide-box',
                    label: 'Client package',
                    to: 'https://www.npmjs.com/package/@evanschleret/formforgeclient',
                    target: '_blank'
                }
            ]
        }
    }
})
