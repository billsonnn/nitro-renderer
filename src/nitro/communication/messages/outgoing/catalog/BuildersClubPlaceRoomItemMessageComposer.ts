import { IMessageComposer } from '../../../../../api';

export class BuildersClubPlaceRoomItemMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuildersClubPlaceRoomItemMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuildersClubPlaceRoomItemMessageComposer>;

    constructor(pageId: number, offerId: number, extraParam: string, positionX: number, positionY: number, direction: number)
    {
        this._data = [pageId, offerId, extraParam, positionX, positionY, direction];
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
