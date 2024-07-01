import { AlphaTolerance, IRoomObjectSprite, RoomObjectSpriteType } from '@nitrots/api';
import { BLEND_MODES, Filter, Texture } from 'pixi.js';

export class RoomObjectSprite implements IRoomObjectSprite
{
    private static SPRITE_COUNTER: number = 0;

    private _id: number = RoomObjectSprite.SPRITE_COUNTER++;
    private _name: string = '';
    private _type: string = '';
    private _spriteType: number = RoomObjectSpriteType.DEFAULT;
    private _texture: Texture = null;

    private _width: number = 0;
    private _height: number = 0;
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _flipH: boolean = false;
    private _flipV: boolean = false;
    private _direction: number = 0;

    private _alpha: number = 255;
    private _blendMode: BLEND_MODES = 'normal';
    private _color: number = 0xFFFFFF;
    private _relativeDepth: number = 0;
    private _varyingDepth: boolean = false;
    private _libraryAssetName: string = '';
    private _clickHandling: boolean = false;
    private _skipMouseHandling: boolean = false;
    private _visible: boolean = true;
    private _tag: string = '';
    private _posture: string = null;
    private _alphaTolerance: number = AlphaTolerance.MATCH_OPAQUE_PIXELS;
    private _filters: Filter[] = [];

    private _updateCounter: number = 0;

    public dispose(): void
    {
        this._texture = null;
        this._width = 0;
        this._height = 0;
    }

    public increaseUpdateCounter(): void
    {
        this._updateCounter++;
    }

    public get id(): number
    {
        return this._id;
    }

    public set id(id: number)
    {
        this._id = id;
    }

    public get name(): string
    {
        return this._name;
    }

    public set name(name: string)
    {
        if(this._name === name) return;

        this._name = name;

        this._updateCounter++;
    }

    public get type(): string
    {
        return this._type;
    }

    public set type(type: string)
    {
        this._type = type;
    }

    public get spriteType(): number
    {
        return this._spriteType;
    }

    public set spriteType(type: number)
    {
        this._spriteType = type;
    }

    public get texture(): Texture
    {
        return this._texture;
    }

    public set texture(texture: Texture)
    {
        if(this._texture === texture) return;

        if(texture)
        {
            this._width = texture.width;
            this._height = texture.height;
        }

        this._texture = texture;

        this._updateCounter++;
    }

    public get width(): number
    {
        return this._width;
    }

    public get height(): number
    {
        return this._height;
    }

    public get offsetX(): number
    {
        return this._offsetX;
    }

    public set offsetX(x: number)
    {
        if(this._offsetX === x) return;

        this._offsetX = x;

        this._updateCounter++;
    }

    public get offsetY(): number
    {
        return this._offsetY;
    }

    public set offsetY(y: number)
    {
        if(this._offsetY === y) return;

        this._offsetY = y;

        this._updateCounter++;
    }

    public get flipH(): boolean
    {
        return this._flipH;
    }

    public set flipH(flip: boolean)
    {
        if(this._flipH === flip) return;

        this._flipH = flip;

        this._updateCounter++;
    }

    public get flipV(): boolean
    {
        return this._flipV;
    }

    public set flipV(flip: boolean)
    {
        if(this._flipV === flip) return;

        this._flipV = flip;

        this._updateCounter++;
    }

    public get direction(): number
    {
        return this._direction;
    }

    public set direction(direction: number)
    {
        this._direction = direction;
    }

    public get alpha(): number
    {
        return this._alpha;
    }

    public set alpha(alpha: number)
    {
        alpha = (alpha & 0xFF);

        if(this._alpha === alpha) return;

        this._alpha = alpha;

        this._updateCounter++;
    }

    public get blendMode(): BLEND_MODES
    {
        return this._blendMode;
    }

    public set blendMode(blend: BLEND_MODES)
    {
        if(this._blendMode === blend) return;

        this._blendMode = blend;

        this._updateCounter++;
    }

    public get color(): number
    {
        return this._color;
    }

    public set color(color: number)
    {
        color = (color & 0xFFFFFF);

        if(this._color === color) return;

        this._color = color;

        this._updateCounter++;
    }

    public get relativeDepth(): number
    {
        return this._relativeDepth;
    }

    public set relativeDepth(depth: number)
    {
        if(this._relativeDepth === depth) return;

        this._relativeDepth = depth;

        this._updateCounter++;
    }

    public get varyingDepth(): boolean
    {
        return this._varyingDepth;
    }

    public set varyingDepth(flag: boolean)
    {
        if(flag === this._varyingDepth) return;

        this._varyingDepth = flag;

        this._updateCounter++;
    }

    public get libraryAssetName(): string
    {
        return this._libraryAssetName;
    }

    public set libraryAssetName(value: string)
    {
        this._libraryAssetName = value;
    }

    public get clickHandling(): boolean
    {
        return this._clickHandling;
    }

    public set clickHandling(flag: boolean)
    {
        this._clickHandling = flag;
    }

    public get visible(): boolean
    {
        return this._visible;
    }

    public set visible(visible: boolean)
    {
        if(this._visible === visible) return;

        this._visible = visible;

        this._updateCounter++;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public set tag(tag: string)
    {
        if(this._tag === tag) return;

        this._tag = tag;

        this._updateCounter++;
    }

    public get posture(): string
    {
        return this._posture;
    }

    public set posture(posture: string)
    {
        if(this._posture === posture) return;

        this._posture = posture;

        this._updateCounter++;
    }

    public get alphaTolerance(): number
    {
        return this._alphaTolerance;
    }

    public set alphaTolerance(tolerance: number)
    {
        if(this._alphaTolerance === tolerance) return;

        this._alphaTolerance = tolerance;

        this._updateCounter++;
    }

    public get filters(): Filter[]
    {
        return this._filters;
    }

    public set filters(filters: Filter[])
    {
        this._filters = filters;

        this._updateCounter++;
    }

    public get updateCounter(): number
    {
        return this._updateCounter;
    }

    public get skipMouseHandling(): boolean
    {
        return this._skipMouseHandling;
    }

    public set skipMouseHandling(flag: boolean)
    {
        this._skipMouseHandling = flag;
    }
}
