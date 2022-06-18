import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class MyRoomHistorySearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyRoomHistorySearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyRoomHistorySearchMessageComposer>;

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
