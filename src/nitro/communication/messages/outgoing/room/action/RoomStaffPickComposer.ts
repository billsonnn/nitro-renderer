import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomStaffPickComposer implements IMessageComposer<ConstructorParameters<typeof RoomStaffPickComposer>>
{
    private _data: ConstructorParameters<typeof RoomStaffPickComposer>;

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