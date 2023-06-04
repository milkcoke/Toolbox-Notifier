import {APIGatewayEvent, Context} from 'aws-lambda'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import {IGitHubHandler} from './service/github-handler.interface'
import {DefaultGitHubHandler} from './service/github-handler'
import gitconfig from '../config/gitconfig'
import {AwsSendEmail} from './service/aws-send-email'

const sesClient = new SESv2Client({region: 'ap-northeast-2'})
const config = gitconfig()

export async function handler (event: APIGatewayEvent, context: Context): Promise<any> {
  try {
    if (event.requestContext['http'].method !== 'POST') throw new Error('Not valid headers')

    const githubHandler: IGitHubHandler = new DefaultGitHubHandler(config.owner, config.repo)
    const latestReleaseId = await githubHandler.getLatestReleaseID()
    const response = await githubHandler.getNumOfDownload(latestReleaseId)

    const awsSendEmail = new AwsSendEmail(sesClient)
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