import 'reflect-metadata'
import {container, instanceCachingFactory} from 'tsyringe'
import {SESv2Client} from '@aws-sdk/client-sesv2'
import Config from '../../config/config'
import {INotifyRepository} from '../repository/notify/notify.repository.interface'

const config = new Config()
export default async function () : Promise<void> {

  // TODO: 기본 Service & Repository 설정
  // Service register
  const {DefaultAppService} = await import('../service/app/default-app.service')
  container.register('IAppService', {useClass: DefaultAppService})
  const {DefaultNotifyService} = await import('../service/notify/default-notify.service')
  // container.register('NotifyService', {useFactory: instanceCachingFactory(container=>container.resolve(DefaultNotifyService))})
  container.register('INotifyService', {useClass: DefaultNotifyService})

  // Repository register
  // 과연 Repository 는 등록이 필요 없을까? => 필요함, interface 들어간건 다 박아야함.

  // Use useFactory when to create custom constructor.
  // This is useful when you need to do some setup before creating the instance.
  // or need to use a constructor with parameters that the container can't resolve automatically,
  // container.register('IAppRepository', {useFactory: instanceCachingFactory(()=>new GithubAppRepository(config))})

  const {GithubAppRepository} = await import('../repository/app/github-app.repository')
  container.register('IAppRepository', {useClass: GithubAppRepository})
  const {AwsSesNotifyRepository} = await import('../repository/notify/aws-ses-notify.repository')
  container.register('INotifyRepository', {
    useFactory: ()=> {
      const sesClient = new SESv2Client({region: 'ap-northeast-2'})
      return new AwsSesNotifyRepository(sesClient, config)
    }})
}
