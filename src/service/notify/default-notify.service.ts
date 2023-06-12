import {INotifyService} from './notify.service.interface'
import {inject, injectable, singleton} from 'tsyringe'
import {INotifyRepository} from '../../repository/notify/notify.repository.interface'

@singleton()
export class DefaultNotifyService implements INotifyService {
  private readonly _notifyRepository
  constructor(@inject('INotifyRepository')notifyRepository: INotifyRepository) {
    this._notifyRepository = notifyRepository
  }
  async notify(message: any): Promise<void> {
    await this._notifyRepository.sendMsg(message)
  }
}
