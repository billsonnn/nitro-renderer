import { Point } from '@pixi/math';
import { AvatarScaleType } from '../../../api';

export class AvatarCanvas
{
    private _id: string;
    private _width: number;
    private _height: number;
    private _offset: Point;
    private _regPoint: Point;

    constructor(k: any, _arg_2: string)
    {
        this._id = k.id;
        this._width = k.width;
        this._height = k.height;
        this._offset = new Point(k.dx, k.dy);

        if(_arg_2 == AvatarScaleType.LARGE) this._regPoint = new Point(((this._width - 64) / 2), 0);
        else this._regPoint = new Point(((this._width - 32) / 2), 0);
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get offset(): Point
    {
        return this._offset;
    }

    public get id(): string
    {
        return this._id;
    }

    public get regPoint(): Point
    {
        return this._regPoint;
    }
}
