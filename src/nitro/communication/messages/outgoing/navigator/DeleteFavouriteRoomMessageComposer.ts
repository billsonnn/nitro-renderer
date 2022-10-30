import { IMessageComposer } from '../../../../../api';

export class DeleteFavouriteRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof DeleteFavouriteRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof DeleteFavouriteRoomMessageComposer>;

    constructor(k: number)
    {
        this._data = [k];
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
