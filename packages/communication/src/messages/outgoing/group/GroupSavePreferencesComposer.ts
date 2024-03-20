import { IMessageComposer } from '@nitrots/api';

export class GroupSavePreferencesComposer implements IMessageComposer<ConstructorParameters<typeof GroupSavePreferencesComposer>>
{
    private _data: ConstructorParameters<typeof GroupSavePreferencesComposer>;

    constructor(groupId: number, state: number, onlyAdminCanDecorate: number)
    {
        this._data = [groupId, state, onlyAdminCanDecorate];
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
