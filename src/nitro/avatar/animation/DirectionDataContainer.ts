import { IAssetAnimationDirection } from '../../../core/asset/interfaces';

export class DirectionDataContainer
{
    private _offset: number;

    constructor(k: IAssetAnimationDirection)
    {
        this._offset = k.offset;
    }

    public get offset(): number
    {
        return this._offset;
    }
}
