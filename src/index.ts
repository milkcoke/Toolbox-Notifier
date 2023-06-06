import 'reflect-metadata'
import {APIGatewayEvent} from 'aws-lambda'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import {container} from 'tsyringe'
import {IGitHubHandler} from './service/event/github-handler.interface'
import {DefaultGitHubHandler} from './service/event/github-handler'
import AWSSESHandler from './service/email/aws-ses-handler'
import Config from '../config/config'

const config = container.resolve(Config)
const sesClient = new SESv2Client({region: 'ap-northeast-2'})

export async function handler (event: APIGatewayEvent): Promise<any> {
  try {
    if (event.requestContext['http'].method !== 'POST') throw new Error('Not valid headers')

    const githubHandler: IGitHubHandler = new DefaultGitHubHandler(config)
    const latestReleaseId = await githubHandler.getLatestReleaseID()
    const response = await githubHandler.getNumOfDownload(latestReleaseId)

    const awsSendEmail = new AWSSESHandler(sesClient, config)
    await awsSendEmail.sendEmail(response)

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