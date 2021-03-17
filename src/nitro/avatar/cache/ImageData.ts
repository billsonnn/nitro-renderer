import { Container, Point, Rectangle, Texture } from 'pixi.js';

export class ImageData
{
    private _texture: Texture;
    private _container: Container;
    private _rect: Rectangle;
    private _regPoint: Point;
    private _flipH: boolean;
    private _color: number;

    constructor(texture: Texture, rectangle: Rectangle, _arg_3: Point, flipH: boolean, color: number, container: Container = null)
    {
        this._texture   = texture;
        this._container = container;
        this._rect      = rectangle;
        this._regPoint  = _arg_3;
        this._flipH     = flipH;
        this._color     = color;

        if(flipH) this._regPoint.x = (-(this._regPoint.x) + rectangle.width);
    }

    public dispose(): void
    {
        this._texture    = null;
        this._regPoint  = null;
        this._color     = null;
    }

    public get texture(): Texture
    {
        return this._texture;
    }

    public get container(): Container
    {
        return this._container;
    }

    public get rect(): Rectangle
    {
        return this._rect;
    }

    public get _Str_1076(): Point
    {
        return this._regPoint;
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public get color(): number
    {
        return this._color;
    }

    public get _Str_1567(): Rectangle
    {
        return new Rectangle(-(this._regPoint.x), -(this._regPoint.y), this._rect.width, this._rect.height);
    }
}