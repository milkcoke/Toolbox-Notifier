export interface INotifyRepository {
  sendMsg(message: any): Promise<void>
}
