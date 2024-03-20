import { IMessageComposer } from '@nitrots/api';

export class RoomUnitDropHandItemComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnitDropHandItemComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnitDropHandItemComposer>;

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
