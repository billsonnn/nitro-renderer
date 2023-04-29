import { Resource, Texture } from '@pixi/core';

export class PlaneTextureBitmap
{
    public static MIN_NORMAL_COORDINATE_VALUE: number = -1;
    public static MAX_NORMAL_COORDINATE_VALUE: number = 1;

    private _bitmap: Texture<Resource>;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;
    private _assetName: string;

    constructor(bitmap: Texture<Resource>, normalMinX: number = -1, normalMaxX: number = 1, normalMinY: number = -1, normalMaxY: number = 1, assetName: string = null)
    {
        this._bitmap = bitmap;
        this._normalMinX = normalMinX;
        this._normalMaxX = normalMaxX;
        this._normalMinY = normalMinY;
        this._normalMaxY = normalMaxY;
        this._assetName = assetName;
    }

    public get bitmap(): Texture<Resource>
    {
        return this._bitmap;
    }

    public get normalMinX(): number
    {
        return this._normalMinX;
    }

    public get normalMaxX(): number
    {
        return this._normalMaxX;
    }

    public get normalMinY(): number
    {
        return this._normalMinY;
    }

    public get normalMaxY(): number
    {
        return this._normalMaxY;
    }

    public get assetName(): string
    {
        return this._assetName;
    }

    public dispose(): void
    {
        this._bitmap = null;
    }
}
