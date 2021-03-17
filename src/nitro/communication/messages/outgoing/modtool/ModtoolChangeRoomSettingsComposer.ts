import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolChangeRoomSettingsComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolChangeRoomSettingsComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolChangeRoomSettingsComposer>;

    constructor(roomId: number, lockDoor: number, changeTitle: number, kickUsers: number)
    {
        this._data = [ roomId, lockDoor, changeTitle, kickUsers ];
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
