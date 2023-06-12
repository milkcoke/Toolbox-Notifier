import {SESv2Client, SendEmailCommand} from '@aws-sdk/client-sesv2'
import Config from '../../../config/config'
import {INotifyRepository} from './notify.repository.interface'
import {injectable, singleton} from 'tsyringe'

@singleton()
export class AwsSesNotifyRepository implements INotifyRepository {
  private readonly _sesv2Client: SESv2Client
  private readonly _config: Config

  constructor(sesv2Client: SESv2Client, config: Config) {
    this._sesv2Client = sesv2Client
    this._config = config
  }

  async sendMsg(message: any): Promise<void> {
    const sendEmailCommand = new SendEmailCommand({
      FromEmailAddress: `${this._config.email}`,
      Destination: {
        ToAddresses: [`${this._config.email}`]
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
