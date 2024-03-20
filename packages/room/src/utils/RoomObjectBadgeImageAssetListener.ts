import { IRoomObjectController } from '@nitrots/api';

export class RoomObjectBadgeImageAssetListener
{
    private _object: IRoomObjectController;
    private _groupBadge: boolean;

    constructor(object: IRoomObjectController, groupBadge: boolean)
    {
        this._object = object;
        this._groupBadge = groupBadge;
    }

    public get object(): IRoomObjectController
    {
        return this._object;
    }

    public get groupBadge(): boolean
    {
        return this._groupBadge;
    }
}
