import 'reflect-metadata'
import {IAppRepository} from '../../../../src/repository/app/app.repository.interface'
import {GithubAppRepository} from '../../../../src/repository/app/github-app.repository'
import Config from '../../../../config/config'

describe('GithubAppRepository', ()=>{

  const config = new Config()
  const githubAppRepository: IAppRepository = new GithubAppRepository(config)

  test('getDownloadAppInfo', async ()=>{
    const latestApp = await githubAppRepository.findLatestApp()
    console.dir(latestApp)
  })
})