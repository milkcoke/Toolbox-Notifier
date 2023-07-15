import {App} from '../../domain/app/app'

export interface ICurrentAppRepository {
  getCurrentApps(): Promise<App[]>
  getCurrentAppVersion(): Promise<string>
}
