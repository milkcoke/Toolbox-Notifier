import {Octokit} from '@octokit/rest'
import {autoInjectable} from 'tsyringe'
import {IGitHubHandler} from './github-handler.interface'
import Config from '../../../config/config'

@autoInjectable()
export class DefaultGitHubHandler implements IGitHubHandler {
  private readonly _octokit = new Octokit()
  private readonly _owner: string
  private readonly _repo: string
  constructor(private readonly _config: Config) {
    this._owner = this._config.owner
    this._repo = this._config.repo
  }

  async getLatestReleaseID(): Promise<number> {

    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._owner,
      repo: this._repo
    })

    return latestRelease.data.id
  }

  async getNumOfDownload(releaseId: number): Promise<any> {

    const response = await this._octokit.rest.repos.getRelease({
      owner: this._owner,
      repo: this._repo,
      release_id: releaseId
    })

    return response.data.assets.map(asset=>{
      return {name: asset.name, downloadCount: asset.download_count}
    })
  }
}
