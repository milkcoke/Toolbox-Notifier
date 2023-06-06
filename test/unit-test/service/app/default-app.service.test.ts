import 'reflect-metadata'
import {container} from 'tsyringe'
import {GithubAppRepository} from '../../../../src/repository/app/github-app.repository'
import {DefaultAppService} from '../../../../src/service/app/default-app.service'
import {IAppService} from '../../../../src/service/app/app.service.interface'

container.register('AppRepository', {
  useClass: GithubAppRepository
})
describe('DefaultAppService', ()=>{
  // container register & resolve with token
  const appService: IAppService = container.resolve(DefaultAppService)

  test('findLatest', async ()=>{
    // Arrange
    // const app = await appService.getAppInfo()

    // Assert
    // expect(app).not.toBeUndefined()
  })

  test('getDiffApps', async ()=>{
    // Arrange
    // const app = await appService.getDiffDownloadCount()

    // Assert
    // expect(app).toBeUndefined()
  })
})