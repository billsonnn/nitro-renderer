import { Point } from '@pixi/math';
import { IGraphicAsset } from '../../../../../../../api';

export class AnimationItem
{
    private _x: number;
    private _y: number;
    private _speedX: number;
    private _speedY: number;
    private _asset: IGraphicAsset;

    constructor(x: number, y: number, speedX: number, speedY: number, asset: IGraphicAsset)
    {
        this._x = x;
        this._y = y;
        this._speedX = speedX;
        this._speedY = speedY;
        this._asset = asset;

        if(isNaN(this._x)) this._x = 0;

        if(isNaN(this._y)) this._y = 0;

        if(isNaN(this._speedX)) this._speedX = 0;

        if(isNaN(this._speedY)) this._speedY = 0;
    }

    public get bitmapData(): IGraphicAsset
    {
        return this._asset;
    }

    public dispose(): void
    {
        this._asset = null;
    }

    public getPosition(maxX: number, maxY: number, dimensionX: number, dimensionY: number, timeSinceStartMs: number): Point
    {
        let x = this._x;
        let y = this._y;

        if(dimensionX > 0) x = (x + (((this._speedX / dimensionX) * timeSinceStartMs) / 1000));

        if(dimensionY > 0) y = (y + (((this._speedY / dimensionY) * timeSinceStartMs) / 1000));

        const _local_8 = Math.trunc((x % 1) * maxX);
        const _local_9 = Math.trunc((y % 1) * maxY);

        return new Point(_local_8, _local_9);
    }
}
