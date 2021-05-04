import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RoomDoorSettingsComposer implements IMessageComposer<ConstructorParameters<typeof RoomDoorSettingsComposer>>
{
    private _data: ConstructorParameters<typeof RoomDoorSettingsComposer>;

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