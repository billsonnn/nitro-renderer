import { BLEND_MODES } from '@pixi/constants';
import { BaseTexture, RenderTexture, Resource, Texture } from '@pixi/core';
import { Point } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { NitroSprite } from '../../../core';
import { TextureUtils } from '../../utils';

export class ExtendedSprite extends Sprite
{
    private _offsetX: number;
    private _offsetY: number;
    private _tag: string;
    private _alphaTolerance: number;
    private _varyingDepth: boolean;
    private _clickHandling: boolean;

    private _pairedSpriteId: number;
    private _pairedSpriteUpdateCounter: number;

    public name: string;

    constructor(texture: Texture<Resource> = null)
    {
        super(texture);

        this._offsetX = 0;
        this._offsetY = 0;
        this._tag = '';
        this._alphaTolerance = 128;
        this._varyingDepth = false;
        this._clickHandling = false;

        this._pairedSpriteId = -1;
        this._pairedSpriteUpdateCounter = -1;
    }

    public needsUpdate(pairedSpriteId: number, pairedSpriteUpdateCounter: number): boolean
    {
        if((this._pairedSpriteId === pairedSpriteId) && (this._pairedSpriteUpdateCounter === pairedSpriteUpdateCounter)) return false;

        this._pairedSpriteId = pairedSpriteId;
        this._pairedSpriteUpdateCounter = pairedSpriteUpdateCounter;

        return true;
    }

    public calculateVertices(): void
    {
        if(!this.texture.orig) return;

        super.calculateVertices();
    }

    public setTexture(texture: Texture<Resource>): void
    {
        if(!texture) texture = Texture.EMPTY;

        if(texture === this.texture) return;

        if(texture === Texture.EMPTY)
        {
            this._pairedSpriteId = -1;
            this._pairedSpriteUpdateCounter = -1;
        }

        this.texture = texture;
    }

    public containsPoint(point: Point): boolean
    {
        return ExtendedSprite.containsPoint(this, point);
    }

    public static containsPoint(sprite: ExtendedSprite, point: Point): boolean
    {
        if(!sprite || !point || (sprite.alphaTolerance > 255)) return false;

        if(!(sprite instanceof Sprite)) return false;

        if((sprite.texture === Texture.EMPTY) || (sprite.blendMode !== BLEND_MODES.NORMAL)) return;

        const texture = sprite.texture;
        const baseTexture = texture.baseTexture;

        if(!texture || !baseTexture || !baseTexture.valid) return false;

        const x = (point.x * sprite.scale.x);
        const y = (point.y * sprite.scale.y);

        if(!sprite.getLocalBounds().contains(x, y)) return false;

        //@ts-ignore
        if(!baseTexture.hitMap)
        {
            let canvas: HTMLCanvasElement = null;

            if(!baseTexture.resource)
            {
                //@ts-ignore
                if(!texture.getLocalBounds)
                {
                    const tempSprite = new NitroSprite(texture);

                    canvas = TextureUtils.generateCanvas(tempSprite);

                    tempSprite.destroy();
                }
                else
                {
                    canvas = TextureUtils.generateCanvas(texture as RenderTexture);
                }
            }

            if(!ExtendedSprite.generateHitMap(baseTexture, canvas)) return false;
        }

        //@ts-ignore
        const hitMap = (baseTexture.hitMap as Uint32Array);

        let dx = (x + texture.frame.x);
        let dy = (y + texture.frame.y);

        if(texture.trim)
        {
            dx -= texture.trim.x;
            dy -= texture.trim.y;
        }

        dx = (Math.round(dx) * baseTexture.resolution);
        dy = (Math.round(dy) * baseTexture.resolution);

        const ind = (dx + dy * baseTexture.realWidth);
        const ind1 = ind % 32;
        const ind2 = ind / 32 | 0;

        return (hitMap[ind2] & (1 << ind1)) !== 0;
    }

    private static generateHitMap(baseTexture: BaseTexture, tempCanvas: HTMLCanvasElement = null): boolean
    {
        let canvas: HTMLCanvasElement = null;
        let context: CanvasRenderingContext2D = null;

        if(tempCanvas)
        {
            canvas = tempCanvas;
            context = canvas.getContext('2d');
        }
        else
        {
            if(!baseTexture.resource) return false;

            //@ts-ignore
            const source = baseTexture.resource.source as HTMLCanvasElement;

            if(!source) return false;

            if(source.getContext)
            {
                canvas = source;
                context = canvas.getContext('2d');
            }

            else if(source instanceof Image)
            {
                canvas = document.createElement('canvas');
                canvas.width = source.width;
                canvas.height = source.height;
                context = canvas.getContext('2d');

                context.drawImage(source, 0, 0);
            }

            else return false;
        }

        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.getImageData(0, 0, width, height);

        const hitmap = new Uint32Array(Math.ceil(width * height / 32));
        const threshold = 128;

        for(let i = 0; i < width * height; i++)
        {
            const ind1 = i % 32;
            const ind2 = i / 32 | 0;

            if(imageData.data[i * 4 + 3] >= threshold)
            {
                hitmap[ind2] = hitmap[ind2] | (1 << ind1);
            }
        }

        //@ts-ignore
        baseTexture.hitMap = hitmap;

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
