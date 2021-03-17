import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomModelComposer implements IMessageComposer<ConstructorParameters<typeof RoomModelComposer>>
{
    private _data: ConstructorParameters<typeof RoomModelComposer>;

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