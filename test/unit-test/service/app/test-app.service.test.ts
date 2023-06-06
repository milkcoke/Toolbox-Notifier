import 'reflect-metadata'
import {instance, mock, when} from 'ts-mockito'
import {DefaultAppService} from '../../../../src/service/app/default-app.service'
import {IAppService} from '../../../../src/service/app/app.service.interface'
import {IAppRepository} from '../../../../src/repository/app/app.repository.interface'
import {App} from '../../../../src/domain/app/app'

// In summary, the main difference between stubs and fakes is that stubs contain hard-coded responses,
// whereas fakes are more complex and simulate the behavior of the real object.
// container.register('AppRepository', {
//   useClass: StubAppRepository
// })

describe('DefaultAppService', ()=>{
  // container register & resolve with token
  // const appService: IAppService = container.resolve(DefaultAppService)
  const testLatestApp = new App('Test', 'v1,0.0', 'Windows-x64', 30)
  const testSecondLatestApp = new App('Test', 'v1,0.0', 'Windows-x64', 28)

  const mockedRepository: IAppRepository = mock<IAppRepository>()
  when(mockedRepository.findLatestApp()).thenResolve(testLatestApp)
  when(mockedRepository.findSecondLatestApp()).thenResolve(testSecondLatestApp)
  const stubRepository = instance(mockedRepository)

  const appService: IAppService = new DefaultAppService(stubRepository)

  test('findLatest', async ()=>{
    // Arrange
    const findLatestSpy = jest.spyOn(stubRepository, 'findLatestApp')

    // Act
    const app = await appService.getAppInfo()

    // Assert
    expect(findLatestSpy).toBeCalled()
    expect(app).toEqual(testLatestApp)
    console.dir(app)
  })

  test('getDiffDownloadInfo', async ()=>{
    // Arrange
    const app = await appService.getAppInfo()

    // Action
    const diff = await appService.getDiffDownloadCount(testSecondLatestApp, app)

    // Assert
    expect(app).toEqual(testLatestApp)
    expect(diff.diffCount).toEqual(app.downloadCount - testSecondLatestApp.downloadCount)
  })
})