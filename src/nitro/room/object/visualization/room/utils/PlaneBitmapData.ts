import { Graphics } from '@pixi/graphics';

export class PlaneBitmapData
{
    private _bitmap: Graphics;
    private _timeStamp: number;

    constructor(k: Graphics, _arg_2: number)
    {
        this._bitmap = k;
        this._timeStamp = _arg_2;
    }

    public dispose(): void
    {
        this._bitmap = null;
    }

    public get bitmap(): Graphics
    {
        return this._bitmap;
    }

    public get timeStamp(): number
    {
        return this._timeStamp;
    }
}
