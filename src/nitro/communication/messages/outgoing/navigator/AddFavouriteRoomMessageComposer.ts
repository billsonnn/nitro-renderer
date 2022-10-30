import { IMessageComposer } from '../../../../../api';

export class AddFavouriteRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof AddFavouriteRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof AddFavouriteRoomMessageComposer>;

    constructor(roomId: number)
    {
        this._data = [roomId];
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
