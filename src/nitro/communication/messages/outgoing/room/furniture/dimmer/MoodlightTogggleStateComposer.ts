import { IMessageComposer } from '../../../../../../../api';

export class MoodlightTogggleStateComposer implements IMessageComposer<ConstructorParameters<typeof MoodlightTogggleStateComposer>>
{
    private _data: ConstructorParameters<typeof MoodlightTogggleStateComposer>;

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
