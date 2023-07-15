import 'reflect-metadata'
import {singleton} from 'tsyringe'
import * as process from 'process'
import {Octokit} from '@octokit/rest'
import dotenv from 'dotenv'
import {join} from 'path'
import {ICurrentAppRepository} from './current-app.repository.interface'
import {GitConfig} from '../../../config/github/git.config'
import {TAppReleaseInfo} from '../../types/app/appInfo'
import {S3Config} from '../../../config/aws/s3.config'
import {S3Client} from '@aws-sdk/client-s3'

dotenv.config({path: join(__dirname, '../../../.env')})

@singleton()
export class GithubCurrentAppRepository implements ICurrentAppRepository {
  private readonly _octokit: Octokit
  private readonly _s3Client = new S3Client({
    region: this._s3Config.region
  })
  private _currentVersion: string

  constructor(private readonly _gitConfig: GitConfig, private readonly _s3Config: S3Config) {
    this._octokit = new Octokit({
      auth: process.env.GITHUB_API_TOKEN,
      timeZone: 'Asia/Seoul'
    })
  }
  async getCurrentApps(): Promise<TAppReleaseInfo[]> {
    const releaseId = await this._getLatestReleaseID()
    return await this._getNumOfDownload(releaseId)
  }

  async getCurrentAppVersion(): Promise<string> {
    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._gitConfig.owner,
      repo: this._gitConfig.repo
    })
    return latestRelease.data.tag_name
  }

  private async _getLatestReleaseID(): Promise<number> {
    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._gitConfig.owner,
      repo: this._gitConfig.repo
    })
    return latestRelease.data.id
  }

  private async _getLatestVersion(): Promise<string> {
    const latestRelease = await this._octokit.rest.repos.getLatestRelease({
      owner: this._gitConfig.owner,
      repo: this._gitConfig.repo
    })

    return latestRelease.data.tag_name
  }
  private async _getNumOfDownload(releaseId: number): Promise<TAppReleaseInfo[]> {

    const response = await this._octokit.rest.repos.getRelease({
      owner: this._gitConfig.owner,
      repo: this._gitConfig.repo,
      release_id: releaseId
    })

    return response.data.assets.map(asset=>{
      return {
        appName: asset.name,
        downloadCount: asset.download_count
      }
    })
  }
}
