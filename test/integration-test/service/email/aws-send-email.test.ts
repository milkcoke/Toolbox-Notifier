import {SESv2Client} from '@aws-sdk/client-sesv2'
import 'reflect-metadata'
import {container} from 'tsyringe'
import AwsSesHandler from '../../../../src/service/email/aws-ses-handler'
import Config from '../../../../config/config'

describe('AWSSendEmail', ()=>{
  const config = container.resolve(Config)
  const awsSesHandler = new AwsSesHandler(new SESv2Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: '',
      secretAccessKey: ''
    }
  }), config)

  test('sendEmail mocking', async ()=>{
    console.dir(awsSesHandler)
    // const response = await awsSesHandler.sendEmail('khzix')
    // console.dir(response)
  })
})
