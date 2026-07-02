import githubRelease from 'new-github-release-url'
import open from 'open'

export function openGithubRelease(version: string) {
  open(
    githubRelease({
      user: 'JackAtlas',
      repo: 'cck-ui',
      tag: version,
      title: version,
    })
  )
}
