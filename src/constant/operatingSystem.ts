export const operatingSystem = {
  'Windowsx-64': 'Windows-x64',
  // 'MacOS-x64': 'MacOS-x64',
  'MacOS-arm64': 'MacOS-arm64'
  // 'Linux': 'Linux'
} as const

export type TOperatingSystem = keyof typeof operatingSystem