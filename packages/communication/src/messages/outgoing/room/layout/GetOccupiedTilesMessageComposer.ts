import { IMessageComposer } from '@nitrots/api';

export class GetOccupiedTilesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetOccupiedTilesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetOccupiedTilesMessageComposer>;

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
