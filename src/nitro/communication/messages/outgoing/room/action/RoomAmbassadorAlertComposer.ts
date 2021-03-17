import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomAmbassadorAlertComposer implements IMessageComposer<ConstructorParameters<typeof RoomAmbassadorAlertComposer>>
{
    private _data: ConstructorParameters<typeof RoomAmbassadorAlertComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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