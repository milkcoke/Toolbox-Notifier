import 'reflect-metadata'
import {APIGatewayEvent} from 'aws-lambda'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import {container} from 'tsyringe'
import Config from '../config/config'
import {IAppService} from './service/app/app.service.interface'
import {INotifyService} from './service/notify/notify.service.interface'

const config = container.resolve(Config)


export async function handler (event: APIGatewayEvent): Promise<any> {
  try {
    if (event.requestContext['http'].method !== 'POST') throw new Error('Not valid headers')

    const appService = container.resolve<IAppService>('IAppService')
    const notifyService = container.resolve<INotifyService>('INotifyService')

    const app = await appService.getAppInfo()
    await notifyService.notify(app)

    return {
      'statusCode': 200,
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': '{"message": "Thanks"}' // Response body as a JSON string
    }
  } catch (e: unknown) {
    console.error(e)
    if (e instanceof Error) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {message: e.message}
      }
    } else {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {message: e}
      }
    }
  }
}
