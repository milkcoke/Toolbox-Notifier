import {APIGatewayEvent, Context} from 'aws-lambda'
import {SESClient, SendEmailCommand} from '@aws-sdk/client-ses'
import {IGitHubHandler} from './service/github-handler.interface'
import {DefaultGitHubHandler} from './service/github-handler'
import gitconfig from '../config/gitconfig'

const sesClient = new SESClient({region: 'ap-northeast-2'})
const config = gitconfig()

export async function handler (event: APIGatewayEvent, context: Context): Promise<any> {
  try {
    if (event.requestContext['http'].method !== 'POST') throw new Error('Not valid headers')

    const githubHandler: IGitHubHandler = new DefaultGitHubHandler(config.owner, config.repo)
    const latestReleaseId = await githubHandler.getLatestReleaseID()
    const response = await githubHandler.getNumOfDownload(latestReleaseId)

    const sendEmailCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [`${config.email}`]
      },
      Message: {
        Body: {
          Text: {Data: response}
        },
        Subject: {Data: 'Toolbox Dev new download event!'}
      },
      Source: 'Toolbox-Notifier@milkcoke'
    })

    const emailResponse = await sesClient.send(sendEmailCommand)
    console.dir(emailResponse)

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