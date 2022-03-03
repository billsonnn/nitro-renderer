import { Point } from '@pixi/math';
import { IGraphicAsset } from '../../../../../../../room/object/visualization/utils/IGraphicAsset';

export class AnimationItem
{
    private _x: number;
    private _y: number;
    private _speedX: number;
    private _speedY: number;
    private _bitmapData: IGraphicAsset;

    constructor(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: IGraphicAsset)
    {
        this._x = k;
        this._y = _arg_2;
        this._speedX = _arg_3;
        this._speedY = _arg_4;
        this._bitmapData = _arg_5;

        if(isNaN(this._x)) this._x = 0;

        if(isNaN(this._y)) this._y = 0;

        if(isNaN(this._speedX)) this._speedX = 0;

        if(isNaN(this._speedY)) this._speedY = 0;
    }

    public get bitmapData(): IGraphicAsset
    {
        return this._bitmapData;
    }

    public dispose(): void
    {
        this._bitmapData = null;
    }

    public getPosition(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: number): Point
    {
        let _local_6 = this._x;
        let _local_7 = this._y;

        if(_arg_3 > 0) _local_6 = (_local_6 + (((this._speedX / _arg_3) * _arg_5) / 1000));

        if(_arg_4 > 0) _local_7 = (_local_7 + (((this._speedY / _arg_4) * _arg_5) / 1000));

        const _local_8 = ((_local_6 % 1) * k);
        const _local_9 = ((_local_7 % 1) * _arg_2);

        return new Point(_local_8, _local_9);
    }
}
