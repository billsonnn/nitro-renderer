import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomMuteUserComposer implements IMessageComposer<ConstructorParameters<typeof RoomMuteUserComposer>>
{
    private _data: ConstructorParameters<typeof RoomMuteUserComposer>;

    constructor(userId: number, minutes: number, roomId: number = 0)
    {
        this._data = [ userId, minutes, roomId ];
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