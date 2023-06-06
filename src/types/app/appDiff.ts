import {TOperatingSystem} from '../../constant/operatingSystem'

export type TAppDiff = {
  readonly appName: string
  readonly version: number
  readonly os: TOperatingSystem
  readonly diffCount: number
}