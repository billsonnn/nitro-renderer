import { IVector3D } from '@/api'

export interface IRoomObjectUpdateMessage {
  readonly location: IVector3D;
  readonly direction: IVector3D;
}
