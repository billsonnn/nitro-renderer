import { IMessageComposer } from '../../../../../../../api';

export class MoodlightSettingsComposer implements IMessageComposer<ConstructorParameters<typeof MoodlightSettingsComposer>>
{
    private _data: ConstructorParameters<typeof MoodlightSettingsComposer>;

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
