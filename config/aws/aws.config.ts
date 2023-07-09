import S3Config from './s3.config'
import {singleton} from 'tsyringe'
import yamlLoader from '../yaml-loader'

@singleton()
export default class AwsConfig {
  private readonly _region: string
  private readonly _accountId: string
  private readonly _s3Config: S3Config
  constructor(s3Config: S3Config) {
    const config = yamlLoader()
    const awsConfig = config.aws
    this._s3Config = s3Config
    this._region = awsConfig.region
    this._accountId = awsConfig.account_id
  }


  get region(): string {
    return this._region
  }

  get accountId(): string {
    return this._accountId
  }

  get s3Config(): S3Config {
    return this._s3Config
  }
}
