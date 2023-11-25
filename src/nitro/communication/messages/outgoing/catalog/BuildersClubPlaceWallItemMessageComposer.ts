import { IMessageComposer } from '../../../../../api';

export class BuildersClubPlaceWallItemMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuildersClubPlaceWallItemMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuildersClubPlaceWallItemMessageComposer>;

    constructor(pageId: number, offerId: number, extraParam: string, wallLocation: string)
    {
        this._data = [pageId, offerId, extraParam, wallLocation];
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
