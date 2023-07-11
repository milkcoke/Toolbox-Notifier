import 'reflect-metadata'
import {singleton} from 'tsyringe'
import {YamlLoader} from '../yaml-loader'

@singleton()
export class GitConfig {
  private readonly _id: string
  private readonly _email: string
  private readonly _owner: string
  private readonly _repo: string
  private readonly _releaseId: string

  constructor() {
    const config = YamlLoader.getData()
    const gitConfig = config.github

    this._id = gitConfig.id
    this._email = gitConfig.email
    this._owner = gitConfig.owner
    this._repo = gitConfig.repo
    this._releaseId = gitConfig.release_id
  }

  get id(): string {
    return this._id
  }

  get email(): string {
    return this._email
  }

  get owner(): string {
    return this._owner
  }

  get repo(): string {
    return this._repo
  }

  get releaseId(): string {
    return this._releaseId
  }
}
