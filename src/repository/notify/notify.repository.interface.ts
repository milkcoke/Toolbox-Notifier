export interface INotifyRepository {
  sendMsg(msg: any): Promise<void>
}