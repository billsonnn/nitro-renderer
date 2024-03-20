import { IMessageComposer } from '@nitrots/api';

export class BuildersClubQueryFurniCountMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuildersClubQueryFurniCountMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuildersClubQueryFurniCountMessageComposer>;

    constructor()
    {
        this._data = [];
    }

    dispose(): void
    {
        this._data = null;
    }

    public getMessageArray()
    {
        return this._data;
    }
}
