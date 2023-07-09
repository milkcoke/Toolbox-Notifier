import {SESv2Client, SendEmailCommand} from '@aws-sdk/client-sesv2'
import {SESConfig} from '../../../config/aws/ses.config'
import {INotifyRepository} from './notify.repository.interface'
import {singleton} from 'tsyringe'

@singleton()
export class AwsSesNotifyRepository implements INotifyRepository {
  private readonly _sesv2Client: SESv2Client
  private readonly _sesConfig: SESConfig

  constructor(sesv2Client: SESv2Client, sesConfig: SESConfig) {
    this._sesv2Client = sesv2Client
    this._sesConfig = sesConfig
  }

  async sendMsg(message: any): Promise<void> {
    const sendEmailCommand = new SendEmailCommand({
      FromEmailAddress: `${this._sesConfig.email}`,
      Destination: {
        ToAddresses: [`${this._sesConfig.email}`]
      },
      Content: {
        Simple: {
          Subject: {
            Data: 'Toolbox Dev new download event!',
            Charset: 'UTF-8'
          },
          Body: {
            Text: {
              Data: message.toString(),
              Charset: 'UTF-8'
            }
          }
        }
      }
    })

    await this._sesv2Client.send(sendEmailCommand)
  }
}
