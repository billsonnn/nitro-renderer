import { Container, Point } from 'pixi.js';

export class AvatarImageBodyPartContainer
{
    private _image: Container;
    private _regPoint: Point;
    private _offset: Point;
    private _isCacheable: boolean;

    constructor(k: Container, _arg_2: Point, _arg_3: boolean)
    {
        this._image         = k;
        this._regPoint      = _arg_2;
        this._offset        = new Point(0, 0);
        this._regPoint      = _arg_2;
        this._isCacheable   = _arg_3;

        this._Str_1225();
    }

    public dispose(): void
    {
        if(this._image)
        {
            this._image.destroy({
                children: true
            });
        }

        this._image     = null;
        this._regPoint  = null;
        this._offset    = null;
    }

    private _Str_1225(): void
    {
        // this._regPoint.x    = this._regPoint.x;
        // this._regPoint.y    = this._regPoint.y;
        // this._offset.x      = this._offset.x;
        // this._offset.y      = this._offset.y;
    }

    public _Str_1387(k: Point): void
    {
        this._regPoint = k;

        this._Str_1225();
    }

    public get image(): Container
    {
        return this._image;
    }

    public set image(k: Container)
    {
        if(this._image && (this._image !== k))
        {
            this._image.destroy({
                children: true
            });
        }

        this._image = k;
    }

    public get _Str_1076(): Point
    {
        const clone = this._regPoint.clone();

        clone.x += this._offset.x;
        clone.y += this._offset.y;

        return clone;
    }

    public set offset(k: Point)
    {
        this._offset = k;

        this._Str_1225();
    }

    public get _Str_1807(): boolean
    {
        return this._isCacheable;
    }
}