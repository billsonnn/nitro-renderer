import { IRoomGeometry } from '../../IRoomGeometry';
import { IVector3D } from '../../IVector3D';
import { IPlaneDrawingData } from './IPlaneDrawingData';

export interface IRoomPlane
{
    uniqueId: number;
    location: IVector3D;
    leftSide: IVector3D;
    rightSide: IVector3D;
    color: number;
    getDrawingDatas(_arg_1: IRoomGeometry): IPlaneDrawingData[];
}
