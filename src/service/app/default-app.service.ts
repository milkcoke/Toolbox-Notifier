import {inject, singleton} from 'tsyringe'
import {IAppService} from './app.service.interface'
import {App} from '../../domain/app/app'
import {ICurrentAppRepository} from '../../repository/app/current-app.repository.interface'
import {ILastAppRepository} from '../../repository/app/last-app.repository.interface'
import {TAppDiff} from '../../types/app/appDiff'

@singleton()
export class DefaultAppService implements IAppService {
  private readonly _currentAppRepository : ICurrentAppRepository
  private readonly _lastAppRepository: ILastAppRepository
  constructor(
    @inject('ICurrentAppRepository') currentAppRepository: ICurrentAppRepository,
    @inject('ILastAppRepository') lastAppRepository: ILastAppRepository
  ) {
    this._currentAppRepository = currentAppRepository
    this._lastAppRepository = lastAppRepository
  }
  async readCurrentAppsInfo(): Promise<App[]> {
    // TODO: Implement
    return Promise.resolve([])
  }

  async readLastAppsInfo(): Promise<App[]> {
    // TODO: Implement
    return Promise.resolve(undefined)
  }


  getDiffDownloadCount(prevApp: App[], curApp: App[]): TAppDiff {
    // TODO: Implement
    prevApp[0]
    curApp[0]

    return {
      appName: 'Toolbox Dev',
      version: '1.0.0',
      os: 'Windows-x64',
      diffCount: 0
    }
  }
}
