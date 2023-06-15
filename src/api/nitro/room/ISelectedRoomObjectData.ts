import { IObjectData, IVector3D } from '@/api'

export interface ISelectedRoomObjectData {
  id: number;
  category: number;
  operation: string;
  loc: IVector3D;
  dir: IVector3D;
  typeId: number;
  instanceData: string;
  stuffData: IObjectData;
  state: number;
  animFrame: number;
  posture: string;
  dispose: () => void;
}
