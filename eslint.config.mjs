// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        rules: {
            '@stylistic/indent': ['error', 4],
            'vue/html-indent': ['error', 4],
            '@typescript-eslint/no-explicit-any': 'off',
            'tailwindcss/no-custom-classname': 'off'
        }
    }
)
