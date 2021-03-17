import { PlaneDrawingData } from '../../../nitro/room/object/visualization/room/PlaneDrawingData';
import { IRoomGeometry } from '../../utils/IRoomGeometry';
import { IVector3D } from '../../utils/IVector3D';

export interface IRoomPlane
{
    uniqueId: number;
    location: IVector3D;
    _Str_5424: IVector3D;
    _Str_4968: IVector3D;
    color: number;
    _Str_22136(_arg_1: IRoomGeometry): PlaneDrawingData[];
}