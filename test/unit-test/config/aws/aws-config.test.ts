import 'reflect-metadata'
import {container} from 'tsyringe'
import AwsConfig from '../../../../config/aws/aws.config'
import S3Config from '../../../../config/aws/s3.config'

describe('aws-config', ()=>{
  beforeEach(() => {
    jest.resetModules()
    container.clearInstances()
  })

  test('aws - local', ()=>{
    jest.isolateModules(()=>{
      process.env.NODE = 'local'
      const localAwsConfig = container.resolve(AwsConfig)
      expect(localAwsConfig.region).toBe('ap-northeast-2')
      expect(localAwsConfig.accountId).toBe(2038920198)
    })
  })

  test('aws and s3', ()=> {
    jest.isolateModules(() => {
      process.env.NODE = 'local'
      const s3Config = container.resolve(S3Config)
      expect(s3Config.region).toBe('ap-northeast-2')
      expect(s3Config.accountId).toBe(2038920198)
      expect(s3Config.bucketName).toBe('toolbox-notifier')
    })
  })
})
