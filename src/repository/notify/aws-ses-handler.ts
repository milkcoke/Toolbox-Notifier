import {SESv2Client, SendEmailCommand} from '@aws-sdk/client-sesv2'
import Config from '../../../config/config'

export default class AwsSesHandler {
  private readonly _sesv2Client: SESv2Client
  private readonly _config: Config

  constructor(sesv2Client: SESv2Client, config: Config) {
    this._sesv2Client = sesv2Client
    this._config = config
  }

  async sendEmail(message: any): Promise<any> {
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

    return await this._sesv2Client.send(sendEmailCommand)
  }
}
