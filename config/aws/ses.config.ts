import {singleton} from 'tsyringe'
import {YamlLoader} from '../yaml-loader'


@singleton()
export class SESConfig {
  private readonly _email: string
  constructor() {
    const config = YamlLoader.getData()
    const sesConfig = config.aws.ses
    this._email = sesConfig.email
  }
  get email(): string {
    return this._email
  }
}
