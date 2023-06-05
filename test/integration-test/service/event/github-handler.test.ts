import 'reflect-metadata'
import {IGitHubHandler} from '../../../../src/service/event/github-handler.interface'
import {DefaultGitHubHandler} from '../../../../src/service/event/github-handler'
import {container} from 'tsyringe'

describe('DefaultGitHubHandler', ()=>{
  const gitHubHandler: IGitHubHandler = container.resolve(DefaultGitHubHandler)

  afterEach(()=>{
    jest.clearAllMocks()
  })

  test('Success get latest releaseId', async ()=>{
    // Arrange
    const latestReleaseId = await gitHubHandler.getLatestReleaseID()

    // Assert
    expect(typeof latestReleaseId).toEqual('number')
  })

  test('Success get assets per each os release', async ()=>{
    const latestReleaseId = await gitHubHandler.getLatestReleaseID()

    const response = await gitHubHandler.getNumOfDownload(latestReleaseId)
    console.dir(response)
  })
})
