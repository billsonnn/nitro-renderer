import { BLEND_MODES } from 'pixi.js';

export class LayerData
{
    public static DEFAULT_COUNT: number = 0;
    public static DEFAULT_DIRECTION: number = 0;
    public static DEFAULT_TAG: string = '';
    public static DEFAULT_BLEND_MODE: BLEND_MODES = 'normal';
    public static DEFAULT_ALPHA: number = 255;
    public static DEFAULT_IGNORE_MOUSE: boolean = false;
    public static DEFAULT_XOFFSET: number = 0;
    public static DEFAULT_YOFFSET: number = 0;
    public static DEFAULT_ZOFFSET: number = 0;

    private _tag: string = LayerData.DEFAULT_TAG;
    private _blendMode: BLEND_MODES = LayerData.DEFAULT_BLEND_MODE;
    private _alpha: number = LayerData.DEFAULT_ALPHA;
    private _ignoreMouse: boolean = LayerData.DEFAULT_IGNORE_MOUSE;
    private _xOffset: number = LayerData.DEFAULT_XOFFSET;
    private _yOffset: number = LayerData.DEFAULT_YOFFSET;
    private _zOffset: number = LayerData.DEFAULT_ZOFFSET;

    public setFromLayer(layer: LayerData): void
    {
        if(!layer) return;

        this._tag = layer.tag;
        this._blendMode = layer.blendMode;
        this._alpha = layer.alpha;
        this._ignoreMouse = layer.ignoreMouse;
        this._xOffset = layer.xOffset;
        this._yOffset = layer.yOffset;
        this._zOffset = layer.zOffset;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public set tag(tag: string)
    {
        this._tag = tag;
    }

    public get blendMode(): BLEND_MODES
    {
        return this._blendMode;
    }

    public set blendMode(value: BLEND_MODES)
    {
        this._blendMode = value;
    }

    public get alpha(): number
    {
        return this._alpha;
    }

    public set alpha(alpha: number)
    {
        this._alpha = alpha;
    }

    public get ignoreMouse(): boolean
    {
        return this._ignoreMouse;
    }

    public set ignoreMouse(flag: boolean)
    {
        this._ignoreMouse = flag;
    }

    public get xOffset(): number
    {
        return this._xOffset;
    }

    public set xOffset(offset: number)
    {
        this._xOffset = offset;
    }

    public get yOffset(): number
    {
        return this._yOffset;
    }

    public set yOffset(offset: number)
    {
        this._yOffset = offset;
    }

    public get zOffset(): number
    {
        return this._zOffset;
    }

    public set zOffset(offset: number)
    {
        this._zOffset = offset;
    }
}
