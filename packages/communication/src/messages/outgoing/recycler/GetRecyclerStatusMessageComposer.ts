import { IMessageComposer } from '@nitrots/api';

export class GetRecyclerStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRecyclerStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRecyclerStatusMessageComposer>;

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
