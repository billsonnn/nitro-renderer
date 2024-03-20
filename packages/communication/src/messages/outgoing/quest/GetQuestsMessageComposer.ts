import { IMessageComposer } from '@nitrots/api';

export class GetQuestsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetQuestsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetQuestsMessageComposer>;

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
