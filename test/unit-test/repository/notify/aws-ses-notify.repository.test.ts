import 'reflect-metadata'
import {anyNumber, instance, mock, when} from 'ts-mockito'
import {INotifyRepository} from '../../../../src/repository/notify/notify.repository.interface'
import {AwsSesNotifyRepository} from '../../../../src/repository/notify/aws-ses-notify.repository'

describe('AwsSesNotifyRepository', ()=>{
  const mockAwsSesNotifyRepository = mock<INotifyRepository>(AwsSesNotifyRepository)

  afterEach(()=>{
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  test('success - sendMsg', async ()=>{
    when(mockAwsSesNotifyRepository.sendMsg(anyNumber())).thenReject(new Error('Number should not be passed'))
    const stubAwsSesNotifyRepository: INotifyRepository = instance(mockAwsSesNotifyRepository)

    const sendMessage = (): Promise<void> => stubAwsSesNotifyRepository.sendMsg(5)

    await expect(sendMessage).rejects.toThrowError('Number should not be passed')
  })
})