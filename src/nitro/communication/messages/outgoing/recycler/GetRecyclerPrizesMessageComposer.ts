import { IMessageComposer } from '../../../../../api';

export class GetRecyclerPrizesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRecyclerPrizesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRecyclerPrizesMessageComposer>;

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
