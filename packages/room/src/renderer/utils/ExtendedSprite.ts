import { AlphaTolerance } from '@nitrots/api';
import { TextureUtils } from '@nitrots/utils';
import { Point, Sprite, Texture, TextureSource } from 'pixi.js';

export class ExtendedSprite extends Sprite
{
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _tag: string = '';
    private _alphaTolerance: number = 128;
    private _varyingDepth: boolean = false;
    private _clickHandling: boolean = false;

    private _updateId1: number = -1;
    private _updateId2: number = -1;

    constructor(texture: Texture = null)
    {
        super(texture);

        this._offsetX = 0;
        this._offsetY = 0;
        this._tag = '';
        this._alphaTolerance = 128;
        this._varyingDepth = false;
        this._clickHandling = false;

        this._updateId1 = -1;
        this._updateId2 = -1;
    }

    public needsUpdate(updateId1: number, updateId2: number): boolean
    {
        if((this._updateId1 === updateId1) && (this._updateId2 === updateId2)) return false;

        this._updateId1 = updateId1;
        this._updateId2 = updateId2;

        return true;
    }

    public setTexture(texture: Texture): void
    {
        if(!texture) texture = Texture.EMPTY;

        if(texture === this.texture) return;

        if(texture === Texture.EMPTY)
        {
            this._updateId1 = -1;
            this._updateId2 = -1;
        }

        this.texture = texture;
    }

    public containsPoint(point: Point): boolean
    {
        if(!point || (this.alphaTolerance > 255)) return false;

        if((this.texture === Texture.EMPTY) || (this.blendMode !== 'normal')) return;

        const texture = this.texture;
        const sourceTexture = texture.source;

        if(!texture || !sourceTexture) return false;

        const x = (point.x * this.scale.x);
        const y = (point.y * this.scale.y);

        if(!this.getLocalBounds().rectangle.contains(x, y)) return false;

        //@ts-ignore
        if(!sourceTexture.hitMap)
        {
            if(!ExtendedSprite.generateHitMap(sourceTexture)) return false;
        }

        //@ts-ignore
        const hitMap = (sourceTexture.hitMap as Uint32Array);

        let dx = (x + texture.frame.x);
        let dy = (y + texture.frame.y);

        if(texture.trim)
        {
            dx -= texture.trim.x;
            dy -= texture.trim.y;
        }

        dx = (Math.round(dx) * sourceTexture.resolution);
        dy = (Math.round(dy) * sourceTexture.resolution);

        const ind = (dx + dy * sourceTexture.pixelWidth);
        const ind1 = ind % 32;
        const ind2 = ind / 32 | 0;

        return (hitMap[ind2] & (1 << ind1)) !== 0;
    }

    private static generateHitMap(textureSource: TextureSource): boolean
    {
        if(!textureSource) return false;

        const texture = new Texture(textureSource);
        const sprite = new Sprite(texture);
        const pixels = TextureUtils.getPixels(sprite);
        const width = textureSource.width;
        const height = textureSource.height;
        const hitmap = new Uint32Array(Math.ceil(width * height / 32));

        for(let i = 0; i < width * height; i++)
        {
            const ind1 = i % 32;
            const ind2 = i / 32 | 0;

            if(pixels.pixels[i * 4 + 3] >= AlphaTolerance.MATCH_OPAQUE_PIXELS) hitmap[ind2] = hitmap[ind2] | (1 << ind1);
        }

        //@ts-ignore
        textureSource.hitMap = hitmap;

        sprite.destroy();
        texture.destroy();

        return true;
    }

    public get offsetX(): number
    {
        return this._offsetX;
    }

    public set offsetX(offset: number)
    {
        this._offsetX = offset;
    }

    public get offsetY(): number
    {
        return this._offsetY;
    }

    public set offsetY(offset: number)
    {
        this._offsetY = offset;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public set tag(tag: string)
    {
        this._tag = tag;
    }

    public get alphaTolerance(): number
    {
        return this._alphaTolerance;
    }

    public set alphaTolerance(tolerance: number)
    {
        this._alphaTolerance = tolerance;
    }

    public get varyingDepth(): boolean
    {
        return this._varyingDepth;
    }

    public set varyingDepth(flag: boolean)
    {
        this._varyingDepth = flag;
    }

    public get clickHandling(): boolean
    {
        return this._clickHandling;
    }

    public set clickHandling(flag: boolean)
    {
        this._clickHandling = flag;
    }
}
