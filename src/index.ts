import 'reflect-metadata'
import {APIGatewayEvent} from 'aws-lambda'
import {container} from 'tsyringe'
import {IAppService} from './service/app/app.service.interface'
import {INotifyService} from './service/notify/notify.service.interface'

export async function handler (event: APIGatewayEvent): Promise<any> {
  try {
    if (event.requestContext['http'].method !== 'POST') throw new Error('Not valid headers')

    const appService = container.resolve<IAppService>('IAppService')
    const notifyService = container.resolve<INotifyService>('INotifyService')

    const app = await appService.readCurrentAppsInfo()
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
