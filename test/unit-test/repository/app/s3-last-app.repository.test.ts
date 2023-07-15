import 'reflect-metadata'
import {container, Lifecycle} from 'tsyringe'
import {S3LastAppRepository} from '../../../../src/repository/app/s3-last-app.repository'
import {ILastAppRepository} from '../../../../src/repository/app/last-app.repository.interface'
import {App} from '../../../../src/domain/app/app'

describe('S3LastAppRepository', ()=>{
  container.register('ILastAppRepository', {useClass: S3LastAppRepository}, {lifecycle: Lifecycle.Singleton})
  const s3LastAppRepository : ILastAppRepository = container.resolve('ILastAppRepository')

  test('fail - getLatestApps not exist s3 key', async ()=>{
    await expect(s3LastAppRepository.getLatestApps('Not Exist Version')).rejects.toThrowError('The specified key does not exist.')
  })

  test('success - getLatestApps', async ()=>{
    const res = await s3LastAppRepository.getLatestApps('v1.0.0')
    expect(res.length).not.toBe(0)
  })

  test('success - updateLatestApps', async ()=>{
    const apps: App[] = []
    apps.push(new App('Toolbox-osx-arm64.dmg', 'v1.0.0', 17))
    apps.push(new App('Toolbox-Windows-x64.exe', 'v1.0.0', 50))
    apps.push(new App('Toolbox-Windows-x64.msix', 'v1.0.0', 5))

    await s3LastAppRepository.updateLatestApps(apps)
  })
})