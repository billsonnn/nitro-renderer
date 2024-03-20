import { IMessageComposer } from '@nitrots/api';

export class GroupBuyDataComposer implements IMessageComposer<ConstructorParameters<typeof GroupBuyDataComposer>>
{
    private _data: ConstructorParameters<typeof GroupBuyDataComposer>;

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
