import { IMessageComposer } from '../../../../../../api';

export class UserSettingsOldChatComposer implements IMessageComposer<ConstructorParameters<typeof UserSettingsOldChatComposer>>
{
    private _data: ConstructorParameters<typeof UserSettingsOldChatComposer>;

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
