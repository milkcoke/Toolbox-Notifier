import {SESv2Client, SendEmailCommand} from '@aws-sdk/client-sesv2'
import gitconfig from '../../config/gitconfig'
import {SendEmailCommandOutput} from '@aws-sdk/client-ses'
export class AwsSendEmail {
  private readonly _sesv2Client: SESv2Client
  private readonly _config = gitconfig()

  constructor(sesv2Client: SESv2Client) {
    this._sesv2Client = sesv2Client
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