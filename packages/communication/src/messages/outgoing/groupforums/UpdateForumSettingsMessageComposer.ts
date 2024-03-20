import { IMessageComposer } from '@nitrots/api';

export class UpdateForumSettingsMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateForumSettingsMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateForumSettingsMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4, _arg_5];
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
