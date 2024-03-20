import { IMessageComposer } from '@nitrots/api';

export class GetRoomAdPurchaseInfoComposer implements IMessageComposer<ConstructorParameters<typeof GetRoomAdPurchaseInfoComposer>>
{
    private _data: ConstructorParameters<typeof GetRoomAdPurchaseInfoComposer>;

    constructor()
    {
        this._data = [];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        this._data = null;
    }
}
