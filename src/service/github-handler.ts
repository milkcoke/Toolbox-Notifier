import {IGitHubHandler} from './github-handler.interface'
import {Octokit} from '@octokit/rest'

export class DefaultGitHubHandler implements IGitHubHandler {
  private readonly _owner: string
  private readonly _repositoryName: string
  private readonly _octokit = new Octokit()

  constructor(owner: string, repositoryName: string) {
    this._owner = owner
    this._repositoryName = repositoryName
  }

  async getLatestReleaseID(): Promise<number> {

    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._owner,
      repo: this._repositoryName
    })

    return latestRelease.data.id
  }

  async getNumOfDownload(releaseId: number): Promise<any> {

    const response = await this._octokit.rest.repos.getRelease({
      owner: this._owner,
      repo: this._repositoryName,
      release_id: releaseId
    })

    return response.data.assets.map(asset=>{
      return {name: asset.name, downloadCount: asset.download_count}
    })
  }
}