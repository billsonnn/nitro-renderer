import { IMessageComposer } from '../../../../../api';

export class MyFavouriteRoomsSearchMessageComposer implements IMessageComposer<ConstructorParameters<typeof MyFavouriteRoomsSearchMessageComposer>>
{
    private _data: ConstructorParameters<typeof MyFavouriteRoomsSearchMessageComposer>;

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
