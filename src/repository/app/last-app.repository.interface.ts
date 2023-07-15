import {App} from '../../domain/app/app'

export interface ILastAppRepository {
  getLatestApps(version: string): Promise<App[]>
  updateLatestApps(apps: App[]): Promise<void>
}
