import { IMessageComposer } from '../../../../../api';

export class GroupSettingsComposer implements IMessageComposer<ConstructorParameters<typeof GroupSettingsComposer>>
{
    private _data: ConstructorParameters<typeof GroupSettingsComposer>;

    constructor(groupId: number)
    {
        this._data = [groupId];
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
