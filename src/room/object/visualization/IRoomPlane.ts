import { PlaneDrawingData } from '../../../nitro/room/object/visualization/room/PlaneDrawingData';
import { IRoomGeometry } from '../../utils/IRoomGeometry';
import { IVector3D } from '../../utils/IVector3D';

export interface IRoomPlane
{
    uniqueId: number;
    location: IVector3D;
    leftSide: IVector3D;
    rightSide: IVector3D;
    color: number;
    getDrawingDatas(_arg_1: IRoomGeometry): PlaneDrawingData[];
}
