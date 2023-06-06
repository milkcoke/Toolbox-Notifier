import {App} from '../../domain/app/app'
import {TAppDiff} from '../../types/app/appDiff'

export interface IAppService {
  getAppInfo(): Promise<App>
  getDiffDownloadCount(prevApp: App, curApp: App): TAppDiff
}