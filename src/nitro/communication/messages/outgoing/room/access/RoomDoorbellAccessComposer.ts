import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomDoorbellAccessComposer implements IMessageComposer<ConstructorParameters<typeof RoomDoorbellAccessComposer>>
{
    private _data: ConstructorParameters<typeof RoomDoorbellAccessComposer>;

    constructor(user: string, allowedEntry: boolean)
    {
        this._data = [ user, allowedEntry ];
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
