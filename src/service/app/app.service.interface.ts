import {TAppDiff} from '../../types/app/appDiff'
import {App} from '../../domain/app/app'

export interface IAppService {
  getDiffDownloadCount(prevApp: App, curApp: App): Promise<TAppDiff>
}