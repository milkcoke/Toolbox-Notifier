import {singleton} from 'tsyringe'
import dotenv from 'dotenv'
import {join} from 'path'
import {GetObjectCommand, PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {S3Config} from '../../../config/aws/s3.config'
import {App} from '../../domain/app/app'
import {ILastAppRepository} from './last-app.repository.interface'
import {TAppAssetInfo} from '../../types/app/appInfo'
import {FILE_EXTENSION} from '../../constant/file'

dotenv.config({path: join(__dirname, '../../../.env')})

@singleton()
export class S3LastAppRepository implements ILastAppRepository {
  private readonly _s3Client: S3Client

  constructor(private readonly _s3Config: S3Config) {
    this._s3Client = new S3Client({
      region: this._s3Config.region,
      // FIXME: Remove this code on production
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    })
  }
  async getLatestApps(version: string): Promise<App[]> {
    const res = await this._s3Client.send(new GetObjectCommand({
      Bucket: this._s3Config.bucketName,
      Key: version + FILE_EXTENSION
    }))

    const appInfoStr = await res.Body?.transformToString()
    const appAssetInfos : TAppAssetInfo[] = JSON.parse(appInfoStr)

    return appAssetInfos.map(appAssetInfo=>{
      return new App(appAssetInfo.assetName, version, appAssetInfo.downloadCount)
    })
  }

  async updateLatestApps(apps: App[]): Promise<void> {
    const currentAppVersion = apps[0].version

    const assetInfos: TAppAssetInfo[] = apps.map(app=>{
      return {
        assetName: app.name,
        downloadCount: app.downloadCount
      }
    })

    await this._s3Client.send(new PutObjectCommand({
      Bucket: this._s3Config.bucketName,
      Key: currentAppVersion + FILE_EXTENSION,
      Body: JSON.stringify(assetInfos),
      ContentType: 'application/json'
    }))
  }
}
