import gitconfig from '../../../config/gitconfig'
import {DefaultGitHubHandler} from '../../../src/service/github-handler'

describe('DefaultGitHubHandler', ()=>{
  const config = gitconfig()
  const defaultGithubHandler = new DefaultGitHubHandler(config.owner, config.repo)

  afterEach(()=>{
    jest.clearAllMocks()
  })

  test('Success get latest releaseId', async ()=>{
    // Arrange
    const latestReleaseId = await defaultGithubHandler.getLatestReleaseID()

    // Assert
    expect(typeof latestReleaseId).toEqual('number')
  })

  test('Success get assets per each os release', async ()=>{
    const latestReleaseId = await defaultGithubHandler.getLatestReleaseID()

    const response = await defaultGithubHandler.getNumOfDownload(latestReleaseId)
    console.dir(response)
  })
})