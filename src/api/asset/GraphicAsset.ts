import { Resource, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { TextureUtils } from '../../pixi-proxy';
import { IGraphicAsset } from './IGraphicAsset';

export class GraphicAsset implements IGraphicAsset
{
    private static GRAPHIC_POOL: GraphicAsset[] = [];

    private _name: string;
    private _source: string;
    private _texture: Texture<Resource>;
    private _usesPalette: boolean;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _flipH: boolean;
    private _flipV: boolean;
    private _rectangle: Rectangle;
    private _initialized: boolean;

    public static createAsset(name: string, source: string, texture: Texture<Resource>, x: number, y: number, flipH: boolean = false, flipV: boolean = false, usesPalette: boolean = false): GraphicAsset
    {
        const graphicAsset = (GraphicAsset.GRAPHIC_POOL.length ? GraphicAsset.GRAPHIC_POOL.pop() : new GraphicAsset());

        graphicAsset._name = name;
        graphicAsset._source = source || null;

        if(texture)
        {
            graphicAsset._texture = texture;
            graphicAsset._initialized = false;
        }
        else
        {
            graphicAsset._texture = null;
            graphicAsset._initialized = true;
        }

        graphicAsset._usesPalette = usesPalette;
        graphicAsset._x = x;
        graphicAsset._y = y;
        graphicAsset._flipH = flipH;
        graphicAsset._flipV = flipV;
        graphicAsset._rectangle = null;

        return graphicAsset;
    }

    public recycle(): void
    {
        this._texture = null;

        GraphicAsset.GRAPHIC_POOL.push(this);
    }

    private initialize(): void
    {
        if(this._initialized || !this._texture) return;

        this._width = this._texture.width;
        this._height = this._texture.height;

        this._initialized = true;
    }

    public getImageUrl(): string
    {
        return TextureUtils.generateImageUrl(new Sprite(this._texture));
    }

    public get name(): string
    {
        return this._name;
    }

    public get source(): string
    {
        return this._source;
    }

    public get texture(): Texture<Resource>
    {
        return this._texture;
    }

    public get usesPalette(): boolean
    {
        return this._usesPalette;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public get width(): number
    {
        this.initialize();

        return this._width;
    }

    public get height(): number
    {
        this.initialize();

        return this._height;
    }

    public get offsetX(): number
    {
        if(!this._flipH) return this._x;

        return (-(this._x));
    }

    public get offsetY(): number
    {
        if(!this._flipV) return this._y;

        return (-(this._y));
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public get flipV(): boolean
    {
        return this._flipV;
    }

    public get rectangle(): Rectangle
    {
        if(!this._rectangle) this._rectangle = new Rectangle(0, 0, this.width, this.height);

        return this._rectangle;
    }
}
