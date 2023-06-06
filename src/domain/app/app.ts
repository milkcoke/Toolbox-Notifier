import {TOperatingSystem} from '../../constant/operatingSystem'

export class App {
  private readonly _name: string
  private readonly _version: string
  private readonly _operatingSystem: TOperatingSystem
  private readonly _downloadCount: number

  constructor(name: string, version: string, operatingSystem: TOperatingSystem, downloadCount) {
    this._name = name
    this._version = version
    this._operatingSystem = operatingSystem
    this._downloadCount = downloadCount
  }

  get name(): string {
    return this._name
  }

  get version(): string {
    return this._version
  }

  get operatingSystem(): TOperatingSystem {
    return this._operatingSystem
  }

  get downloadCount(): number {
    return this._downloadCount
  }
}