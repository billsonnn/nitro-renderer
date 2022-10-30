import { IMessageComposer } from '../../../../../../api';

export class UserSettingsRoomInvitesComposer implements IMessageComposer<ConstructorParameters<typeof UserSettingsRoomInvitesComposer>>
{
    private _data: ConstructorParameters<typeof UserSettingsRoomInvitesComposer>;

    constructor(value: boolean)
    {
        this._data = [value];
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
