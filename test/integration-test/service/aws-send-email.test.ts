import {AwsSendEmail} from '../../../src/service/aws-send-email'
import {SESv2Client} from '@aws-sdk/client-sesv2'
describe('AWSSendEmail', ()=>{
  test('sendEmail mocking', async ()=>{
    const awsSendEmail = new AwsSendEmail(new SESv2Client({
      region: 'ap-northeast-2'
      // credentials: {
      //   accessKeyId: 'INVALID_ACCESS_KEY',
      //   secretAccessKey: 'INVALID_SECRET_KEY'
      // }
    }))
    // const response = await awsSendEmail.sendEmail('khzix')
    // console.dir(response)
  })
})