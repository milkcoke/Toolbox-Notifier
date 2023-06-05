import {singleton} from 'tsyringe'
import * as yaml from 'js-yaml'
import {readFileSync} from 'fs'
import {join} from 'path'

const YAML_CONFIG_FILENAME = 'gitconfig.yaml'

@singleton()
export default class Config {
  private readonly _owner: string
  private readonly _repo: string
  private readonly _releaseId: number
  private readonly _email: string

  constructor() {
    const config : Record<string, any> = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'))
    this._owner = config.owner
    this._repo = config.repo
    this._releaseId = config.release_id
    this._email = config.email
  }

  get owner(): string {
    return this._owner
  }
  get repo(): string {
    return this._repo
  }

  get releaseId(): number {
    return this._releaseId
  }

  get email(): string {
    return this._email
  }
}
