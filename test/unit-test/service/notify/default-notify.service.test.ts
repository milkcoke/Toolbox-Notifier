import 'reflect-metadata'
import {INotifyRepository} from '../../../../src/repository/notify/notify.repository.interface'
import {DefaultNotifyService} from '../../../../src/service/notify/default-notify.service'

describe('DefaultNotifyService', ()=>{
  const mockNotifyRepository: INotifyRepository = {
    sendMsg: jest.fn()
  }
  const defaultNotifyService = new DefaultNotifyService(mockNotifyRepository)

  afterEach(()=>{
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  test('success - notify message', ()=>{
    // Arrange
    const msg = 'hi'

    // Act
    defaultNotifyService.notify(msg)

    // Assert
    expect(mockNotifyRepository.sendMsg).toBeCalledWith(msg)
  })
})