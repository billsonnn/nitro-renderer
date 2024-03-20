import { IMessageComposer } from '@nitrots/api';

export class MyGuildBasesSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyGuildBasesSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyGuildBasesSearchMessageComposer>;

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
