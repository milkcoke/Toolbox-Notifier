export interface INotifyService {
  notify(): Promise<void>
  // service => create, update, read 등 action
  // repository => findById, save 등 서술어
}