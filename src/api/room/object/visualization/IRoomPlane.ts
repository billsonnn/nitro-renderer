import { IPlaneDrawingData, IRoomGeometry, IVector3D } from '@/api'

export interface IRoomPlane {
  uniqueId: number;
  location: IVector3D;
  leftSide: IVector3D;
  rightSide: IVector3D;
  color: number;

  getDrawingDatas(_arg_1: IRoomGeometry): IPlaneDrawingData[];
}
