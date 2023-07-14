import {TAppReleaseInfo} from '../../types/app/appInfo'

export interface ICurrentAppRepository {
  // If domain is complex then define domain DTO class
  getCurrentApps(): Promise<TAppReleaseInfo[]>
}
