import 'reflect-metadata'
import {singleton} from 'tsyringe'
import * as process from 'process'
import {Octokit} from '@octokit/rest'
import dotenv from 'dotenv'
import {join} from 'path'
import {IAppRepository} from './app.repository.interface'
import {App} from '../../domain/app/app'
import {GitConfig} from '../../../config/github/git.config'
import {TAppReleaseInfo} from '../../types/app/appRelease'

dotenv.config({path: join(__dirname, '../../../.env')})

@singleton()
export class GithubAppRepository implements IAppRepository {
  private readonly _owner: string
  private readonly _repo: string
  private readonly _githubId: string
  private readonly _octokit: Octokit
  constructor(private readonly _gitConfig: GitConfig) {
    this._owner = this._gitConfig.owner
    this._repo = this._gitConfig.repo
    this._githubId = this._gitConfig.id
    this._octokit = new Octokit({
      auth: 'token ' + process.env.GITHUB_API_TOKEN,
      baseUrl: `https://api.github.com/users/${this._githubId}`,
      timeZone: 'Asia/Seoul'
    })
  }
  async findLatestApp(): Promise<App> {
    const releaseId = await this._getLatestReleaseID()
    const version = await this._getLatestVersion()
    const appReleaseInfos = await this._getNumOfDownload(releaseId)
    // TODO: LatestApp 이 무엇인지 정의하기
    return new App('name', version, 'Windows-x64', 5000)
  }

  async findSecondLatestApp(): Promise<App> {
    return Promise.resolve(undefined)
  }

  private async _getLatestReleaseID(): Promise<number> {

    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._owner,
      repo: this._repo
    })

    console.dir(latestRelease)

    return latestRelease.data.id
  }

  private async _getLatestVersion(): Promise<string> {
    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._owner,
      repo: this._repo
    })

    return latestRelease.data.tag_name
  }
  private async _getNumOfDownload(releaseId: number): Promise<TAppReleaseInfo[]> {

    const response = await this._octokit.rest.repos.getRelease({
      owner: this._owner,
      repo: this._repo,
      release_id: releaseId
    })

    return response.data.assets.map(asset=>{
      return {
        fullAppName: asset.name,
        downloadCount: asset.download_count
      }
    })
  }

}
