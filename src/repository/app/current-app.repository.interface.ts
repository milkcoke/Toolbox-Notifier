import {TAppReleaseInfo} from '../../types/app/appInfo'

export interface ICurrentAppRepository {
  getCurrentApps(): Promise<TAppReleaseInfo[]>
  getCurrentAppVersion(): Promise<string>
}
