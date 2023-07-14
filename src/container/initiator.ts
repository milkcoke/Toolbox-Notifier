import 'reflect-metadata'
import {container, Lifecycle} from 'tsyringe'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import {SESConfig} from '../../config/aws/ses.config'
export default async function () : Promise<void> {

  const {DefaultAppService} = await import('../service/app/default-app.service')
  container.register('IAppService', {useClass: DefaultAppService}, {lifecycle: Lifecycle.Singleton})
  const {DefaultNotifyService} = await import('../service/notify/default-notify.service')
  // container.register('NotifyService', {useFactory: instanceCachingFactory(container=>container.resolve(DefaultNotifyService))})
  container.register('INotifyService', {useClass: DefaultNotifyService}, {lifecycle: Lifecycle.Singleton})

  // Repository register
  // 과연 Repository 는 등록이 필요 없을까? => 필요함, interface 들어간건 다 박아야함.
  const {GithubCurrentAppRepository} = await import('../repository/app/github-current-app.repository')
  container.register('ICurrentAppRepository', {useClass: GithubCurrentAppRepository}, {lifecycle: Lifecycle.Singleton})
  const {S3LastAppRepository} = await import('../repository/app/s3-last-app.repository')
  container.register('ILastAppRepository', {useClass: S3LastAppRepository}, {lifecycle: Lifecycle.Singleton})

  const {AwsSesNotifyRepository} = await import('../repository/notify/aws-ses-notify.repository')
  // TODO: How to inject with lifecycle `singleton`? or value in constructor in DI?
  container.register('INotifyRepository', {
    useFactory: ()=> {
      const sesClient = new SESv2Client({region: 'ap-northeast-2'})
      const sesConfig = container.resolve(SESConfig)
      return new AwsSesNotifyRepository(sesClient, sesConfig)
    }})
}
