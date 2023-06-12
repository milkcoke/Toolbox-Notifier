import {IAppService} from './app.service.interface'
import {App} from '../../domain/app/app'
import {TAppDiff} from '../../types/app/appDiff'
import {IAppRepository} from '../../repository/app/app.repository.interface'
import {inject, singleton} from 'tsyringe'

@singleton()
export class DefaultAppService implements IAppService {
  private readonly _appRepository : IAppRepository
  constructor(@inject('IAppRepository') appRepository: IAppRepository) {
    this._appRepository = appRepository
  }
  async getAppInfo(): Promise<App> {
    return await this._appRepository.findLatestApp()
  }

  getDiffDownloadCount(prevApp: App, curApp: App): TAppDiff {
    const diffDownloadCount = curApp.downloadCount - prevApp.downloadCount

    return {
      appName: curApp.name,
      version: curApp.version,
      os: curApp.operatingSystem,
      diffCount: diffDownloadCount
    }
  }
}
