import {ILastAppRepository} from './last-app.repository.interface'
import {TAppReleaseInfo} from '../../types/app/appInfo'
import {GetObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {S3Config} from '../../../config/aws/s3.config'

export class S3LastAppRepository implements ILastAppRepository {
  private readonly _s3Client: S3Client

  constructor(private readonly _s3Config: S3Config) {
    this._s3Client = new S3Client({
      region: this._s3Config.region
    })
  }
  async getLatestApps(version: string): Promise<TAppReleaseInfo[]> {
    // TODO: Implement
    await this._s3Client.send(new GetObjectCommand({
      Bucket: this._s3Config.bucketName,
      Key: '/' + version
    }))

    return [
      {appName: 'Windows-x64', downloadCount: 50}
    ]
  }

}
