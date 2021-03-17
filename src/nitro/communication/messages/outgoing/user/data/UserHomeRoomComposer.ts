import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserHomeRoomComposer implements IMessageComposer<ConstructorParameters<typeof UserHomeRoomComposer>>
{
    private _data: ConstructorParameters<typeof UserHomeRoomComposer>;

    constructor(roomId: number)
    {
        this._data = [ roomId ];
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