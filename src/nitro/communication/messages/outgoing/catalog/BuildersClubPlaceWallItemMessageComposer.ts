import { IMessageComposer } from '../../../../../api';

export class BuildersClubPlaceWallItemMessageComposer implements IMessageComposer<ConstructorParameters<typeof BuildersClubPlaceWallItemMessageComposer>>
{
    private _data: ConstructorParameters<typeof BuildersClubPlaceWallItemMessageComposer>;

    constructor(k: number, _arg_2: number, _arg_3: string, _arg_4: string)
    {
        this._data = [k, _arg_2, _arg_3, _arg_4];
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
