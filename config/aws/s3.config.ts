import 'reflect-metadata'
import yamlLoader from '../yaml-loader'
import {singleton} from 'tsyringe'

@singleton()
export default class S3Config {
  private readonly _region: string
  private readonly _accountId: string
  private readonly _bucketName: string
  private readonly _memos: string[]
  constructor() {
    console.log('s3 initialized!')
    const config = yamlLoader()
    const s3Config = config.aws.s3
    this._region = s3Config.region
    this._accountId = s3Config.account_id
    this._bucketName = s3Config.bucket_name
    this._memos = s3Config.memos
  }

  get region(): string {
    return this._region
  }

  get accountId(): string {
    return this._accountId
  }

  get bucketName(): string {
    return this._bucketName
  }

  get memos(): string[] {
    return this._memos
  }
}
