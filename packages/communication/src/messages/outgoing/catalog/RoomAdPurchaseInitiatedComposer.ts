import { IMessageComposer } from '@nitrots/api';

export class RoomAdPurchaseInitiatedComposer implements IMessageComposer<ConstructorParameters<typeof RoomAdPurchaseInitiatedComposer>>
{
    private _data: ConstructorParameters<typeof RoomAdPurchaseInitiatedComposer>;

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
        return;
    }
}
