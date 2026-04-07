import { z } from 'zod'
import { defineMcpPrompt } from '@nuxtjs/mcp-toolkit/server'

export default defineMcpPrompt({
    description: 'Suggests the best FormForge integration mode based on project constraints',
    inputSchema: {
        stack: z.string().describe('Project stack, for example laravel-api + nuxt-spa'),
        needs: z.string().describe('Short description of constraints and expected scope')
    },
    handler: async ({ stack, needs }) => {
        return {
            messages: [{
                role: 'user',
                content: {
                    type: 'text',
                    text: `Given this project stack: ${stack}. Constraints: ${needs}. Suggest the best FormForge integration mode (A/B/C/D), explain tradeoffs, and propose a safe migration path with concrete first steps.`
                }
            }]
        }
    }
})
