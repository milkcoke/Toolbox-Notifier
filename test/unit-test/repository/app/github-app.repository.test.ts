import 'reflect-metadata'
import {IAppRepository} from '../../../../src/repository/app/app.repository.interface'
import {GithubAppRepository} from '../../../../src/repository/app/github-app.repository'
import {container} from 'tsyringe'

describe('GithubAppRepository', ()=>{

  const githubAppRepository: IAppRepository = container.resolve(GithubAppRepository)

  test('getDownloadAppInfo', async ()=>{
    // TODO: Request get a higher rate limit
    // const latestApp = await githubAppRepository.findLatestApp()
    console.dir(githubAppRepository)
  })
})
