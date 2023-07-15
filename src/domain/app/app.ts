export class App {
  private readonly _name: string
  private readonly _version: string
  private readonly _downloadCount: number

  constructor(name: string, version: string, downloadCount: number) {
    this._name = name
    this._version = version
    this._downloadCount = downloadCount
  }

  get name(): string {
    return this._name
  }

  get version(): string {
    return this._version
  }

  get downloadCount(): number {
    return this._downloadCount
  }
}