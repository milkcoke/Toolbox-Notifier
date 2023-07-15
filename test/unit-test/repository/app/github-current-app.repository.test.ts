import 'reflect-metadata'
import {container, Lifecycle} from 'tsyringe'
import {GithubCurrentAppRepository} from '../../../../src/repository/app/github-current-app.repository'
import {ICurrentAppRepository} from '../../../../src/repository/app/current-app.repository.interface'

describe('GithubCurrentAppRepository', ()=>{
  container.register('ICurrentAppRepository', {useClass: GithubCurrentAppRepository}, {lifecycle: Lifecycle.Singleton})
  const githubCurrentAppRepository : ICurrentAppRepository = container.resolve('ICurrentAppRepository')

  test('success - getCurrentApps', async ()=>{
    const apps = await githubCurrentAppRepository.getCurrentApps()
    expect(apps.length).not.toBe(0)
  })

  test('success - getCurrentAppVersion', async ()=>{
    const currentVersion = await githubCurrentAppRepository.getCurrentAppVersion()
    expect(typeof currentVersion).toEqual('string')
  })
})