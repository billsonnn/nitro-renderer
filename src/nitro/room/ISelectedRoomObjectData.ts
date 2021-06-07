import { IObjectData } from './object/data/IObjectData';

export interface ISelectedRoomObjectData
{
    id: number;
    category: number;
    operation: string;
    typeId: number;
    instanceData: string;
    stuffData: IObjectData;
    state: number;
    animFrame: number;
    posture: string;
}
