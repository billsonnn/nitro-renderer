import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomBlockedTilesComposer implements IMessageComposer<ConstructorParameters<typeof RoomBlockedTilesComposer>>
{
    private _data: ConstructorParameters<typeof RoomBlockedTilesComposer>;

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