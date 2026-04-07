import { defineEventHandler } from 'h3'
import type { H3Event } from 'h3'

interface GithubRepositoryResponse {
    stargazers_count?: number
}

interface RepositoryStars {
    repository: string
    stars: number
}

interface GithubStarsResponse {
    total: number
    repositories: RepositoryStars[]
}

const fallbackRepositories: string[] = [
    'EvanSchleret/FormForge',
    'EvanSchleret/FormForgeClient',
    'EvanSchleret/laravel-typebridge',
    'EvanSchleret/lara-mjml',
    'EvanSchleret/laravel-user-presence'
]

async function fetchRepositoryStars(repository: string, headers: Record<string, string>): Promise<number> {
    try {
        const response = await $fetch<GithubRepositoryResponse>(`https://api.github.com/repos/${repository}`, {
            headers
        })

        return typeof response.stargazers_count === 'number' ? response.stargazers_count : 0
    } catch {
        return 0
    }
}

const cacheTtlMs = 60 * 60 * 1000
let cachedResponse: GithubStarsResponse | null = null
let cachedAt = 0

export default defineEventHandler(async (event: H3Event): Promise<GithubStarsResponse> => {
    const now = Date.now()

    if (cachedResponse !== null && now - cachedAt < cacheTtlMs) {
        return cachedResponse
    }

    const config = useRuntimeConfig(event)
    const publicGithub = config.public.github as { repositories?: string[] } | undefined
    const repositories = Array.isArray(publicGithub?.repositories) && publicGithub.repositories.length > 0
        ? publicGithub.repositories
        : fallbackRepositories

    const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json'
    }

    if (typeof config.githubToken === 'string' && config.githubToken.length > 0) {
        headers.Authorization = `Bearer ${config.githubToken}`
    }

    const starsByRepository: RepositoryStars[] = await Promise.all(
        repositories.map(async (repository): Promise<RepositoryStars> => {
            const stars = await fetchRepositoryStars(repository, headers)

            return {
                repository,
                stars
            }
        })
    )

    const total = starsByRepository.reduce((sum, item) => {
        return sum + item.stars
    }, 0)

    const response: GithubStarsResponse = {
        total,
        repositories: starsByRepository
    }

    cachedResponse = response
    cachedAt = now

    return response
})
