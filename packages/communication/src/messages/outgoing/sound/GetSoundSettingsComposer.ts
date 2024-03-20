import { IMessageComposer } from '@nitrots/api';

export class GetSoundSettingsComposer implements IMessageComposer<ConstructorParameters<typeof GetSoundSettingsComposer>>
{
    private _data: ConstructorParameters<typeof GetSoundSettingsComposer>;

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
