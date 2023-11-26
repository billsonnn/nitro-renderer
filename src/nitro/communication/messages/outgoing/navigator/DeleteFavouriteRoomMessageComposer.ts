import { IMessageComposer } from '../../../../../api';

export class DeleteFavouriteRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof DeleteFavouriteRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof DeleteFavouriteRoomMessageComposer>;

    constructor(flatId: number)
    {
        this._data = [flatId];
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
