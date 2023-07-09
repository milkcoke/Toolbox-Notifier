import {singleton} from 'tsyringe'
import yamlLoader from '../yaml-loader'


@singleton()
export class SESConfig {
  private readonly _email: string
  constructor() {
    const config = yamlLoader()
    const sesConfig = config.aws.ses
    this._email = sesConfig.email
  }
  get email(): string {
    return this._email
  }
}
