import { IVector3D } from './IVector3D';

export interface IRoomObjectUpdateMessage
{
    readonly location: IVector3D;
    readonly direction: IVector3D;
}
