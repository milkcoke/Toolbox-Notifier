import {App} from '../../domain/app/app'

export interface IAppRepository {
  // FIXME: Is it appropriate approach return type domain?
  // If domain is complex then define domain DTO class
  findLatestApp(): Promise<App>
  findSecondLatestApp(): Promise<App>
}