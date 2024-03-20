import { IMessageComposer } from '@nitrots/api';

export class MoodlightSettingsSaveComposer implements IMessageComposer<ConstructorParameters<typeof MoodlightSettingsSaveComposer>>
{
    private _data: ConstructorParameters<typeof MoodlightSettingsSaveComposer>;

    constructor(k: number, arg2: number, arg3: string, arg4: number, arg5: boolean)
    {
        this._data = [k, arg2, arg3, arg4, arg5];
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
