interface GithubReleaseResponse {
    tag_name: string
    name: string | null
    body: string | null
    html_url: string
    published_at: string | null
    prerelease: boolean
    draft: boolean
}

interface GithubRelease extends GithubReleaseResponse {
    repository: string
}

export default defineEventHandler(async (): Promise<GithubRelease[]> => {
    const config = useRuntimeConfig()
    const repositories = config.public.github.releaseRepositories as string[]
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    }

    if (typeof config.githubToken === 'string' && config.githubToken.length > 0) {
        headers.Authorization = `Bearer ${config.githubToken}`
    }

    const releases = await Promise.all(repositories.map(async (repository): Promise<GithubRelease[]> => {
        const values = await $fetch<GithubReleaseResponse[]>(`https://api.github.com/repos/${repository}/releases`, {
            headers,
            query: { per_page: 20 }
        })

        return values
            .filter(release => !release.draft)
            .map(release => ({ ...release, repository }))
    }))

    return releases
        .flat()
        .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''))
})
