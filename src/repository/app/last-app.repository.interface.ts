import {TAppReleaseInfo} from '../../types/app/appInfo'

export interface ILastAppRepository {
  getLatestApps(version: string): Promise<TAppReleaseInfo[]>
}
