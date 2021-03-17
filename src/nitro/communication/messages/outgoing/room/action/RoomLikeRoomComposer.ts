import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomLikeRoomComposer implements IMessageComposer<ConstructorParameters<typeof RoomLikeRoomComposer>>
{
    private _data: ConstructorParameters<typeof RoomLikeRoomComposer>;

    constructor(k: number)
    {
        this._data = [ k ];
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
