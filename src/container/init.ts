import {default as init} from './initiator'
import {container} from 'tsyringe'
import {IAppService} from '../service/app/app.service.interface'
import {INotifyService} from '../service/notify/notify.service.interface'

(async (): Promise<void> =>{
  await init()
  // const appService = container.resolve<IAppService>('IAppService')
  // await appService.getAppInfo()

  const notifyService = container.resolve<INotifyService>('INotifyService')
  await notifyService.notify('hi')
})()
