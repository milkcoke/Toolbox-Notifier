export interface INotifyService {
  notify(msg: any): Promise<void>
}