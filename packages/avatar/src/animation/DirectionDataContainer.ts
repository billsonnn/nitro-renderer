import { IAssetAnimationDirection } from '@nitrots/api';

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
