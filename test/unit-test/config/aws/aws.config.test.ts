import 'reflect-metadata'
import {container} from 'tsyringe'
import {AwsConfig} from '../../../../config/aws/aws.config'
import {S3Config} from '../../../../config/aws/s3.config'
import {SESConfig} from '../../../../config/aws/ses.config'

describe('aws-config', ()=>{
  beforeEach(() => {
    jest.resetModules()
    container.clearInstances()
  })

  test('aws - local', ()=>{
    jest.isolateModules(()=>{
      process.env.NODE = 'local'
      // TODO: Hard coding
      const localAwsConfig = container.resolve(AwsConfig)
      console.dir(localAwsConfig)
    })
  })

  test('aws and s3 - local', ()=> {
    jest.isolateModules(() => {
      process.env.NODE = 'local'
      const s3Config = container.resolve(S3Config)
      expect(s3Config.region).toBe('ap-northeast-2')
      expect(s3Config.bucketName).toBe('toolbox-app-info')
    })
  })

  test('aws ses - local', ()=>{
    jest.isolateModules(()=>{
      process.env.NODE = 'local'
      const sesConfig = container.resolve(SESConfig)
      expect(sesConfig.email).toBe('mbh023@gmail.com')
    })
  })
})
