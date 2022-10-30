import { IVector3D } from '../../../api';

export class RoomMapMaskData
{
    private _masks: { id: string, type: string, category: string, locations: IVector3D[] }[];

    constructor()
    {
        this._masks = [];
    }

    public get masks(): { id: string, type: string, category: string, locations: IVector3D[] }[]
    {
        return this._masks;
    }
}
