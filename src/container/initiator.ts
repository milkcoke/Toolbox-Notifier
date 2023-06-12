import 'reflect-metadata'
import {container, Lifecycle} from 'tsyringe'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import Config from '../../config/config'
import {INotifyRepository} from '../repository/notify/notify.repository.interface'

export default async function () : Promise<void> {

  const {DefaultAppService} = await import('../service/app/default-app.service')
  container.register('IAppService', {useClass: DefaultAppService}, {lifecycle: Lifecycle.Singleton})
  const {DefaultNotifyService} = await import('../service/notify/default-notify.service')
  // container.register('NotifyService', {useFactory: instanceCachingFactory(container=>container.resolve(DefaultNotifyService))})
  container.register('INotifyService', {useClass: DefaultNotifyService}, {lifecycle: Lifecycle.Singleton})

  // Repository register
  // 과연 Repository 는 등록이 필요 없을까? => 필요함, interface 들어간건 다 박아야함.
  const {GithubAppRepository} = await import('../repository/app/github-app.repository')
  container.register('IAppRepository', {useClass: GithubAppRepository}, {lifecycle: Lifecycle.Singleton})
  const {AwsSesNotifyRepository} = await import('../repository/notify/aws-ses-notify.repository')
  // TODO: How to inject with lifecycle `singleton`? or value in constructor in DI?
  container.register('INotifyRepository', {
    useFactory: ()=> {
      const sesClient = new SESv2Client({region: 'ap-northeast-2'})
      const config = container.resolve(Config)
      return new AwsSesNotifyRepository(sesClient, config)
    }})
}
