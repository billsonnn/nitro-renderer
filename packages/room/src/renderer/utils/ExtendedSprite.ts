import { AlphaTolerance } from '@nitrots/api';
import { GetRenderer, TextureUtils } from '@nitrots/utils';
import { Point, RendererType, Sprite, Texture, TextureSource, WebGPURenderer } from 'pixi.js';

const BYTES_PER_PIXEL = 4;

export class ExtendedSprite extends Sprite
{
    private _offsetX: number = 0;
    private _offsetY: number = 0;
    private _tag: string = '';
    private _alphaTolerance: number = AlphaTolerance.MATCH_OPAQUE_PIXELS;
    private _varyingDepth: boolean = false;
    private _clickHandling: boolean = false;
    private _skipMouseHandling: boolean = false;

    private _updateId1: number = -1;
    private _updateId2: number = -1;

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
        if(!point || (this.alphaTolerance > 255) || !this.texture || (this.texture === Texture.EMPTY)) return false;

        point = new Point((point.x * this.scale.x), (point.y * this.scale.y));

        if(!super.containsPoint(point)) return false;

        const texture = this.texture;
        const textureSource = this.texture.source;

        //@ts-ignore
        if((!textureSource || !textureSource.hitMap) && !ExtendedSprite.generateHitMapForTextureSource(textureSource)) return false;

        //@ts-ignore
        const hitMap = (textureSource.hitMap as Uint8Array);

        if(!hitMap) return false;

        let dx = (point.x + texture.frame.x);
        let dy = (point.y + texture.frame.y);

        if(this.texture.trim)
        {
            dx -= texture.trim.x;
            dy -= texture.trim.y;
        }

        dx = (Math.round(dx) * textureSource.resolution);
        dy = (Math.round(dy) * textureSource.resolution);

        const index = (dx + dy * textureSource.width) * 4;

        return (hitMap[index + 3] >= this.alphaTolerance);
    }

    private static generateHitMapForTextureSource(textureSource: TextureSource): boolean
    {
        if(!textureSource) return false;

        const renderer = GetRenderer();
        const width = Math.max(Math.round(textureSource.width * textureSource.resolution), 1);
        const height = Math.max(Math.round(textureSource.height * textureSource.resolution), 1);

        let pixels: Uint8ClampedArray = null;

        if(renderer instanceof WebGPURenderer)
        {
            pixels = TextureUtils.getPixels(new Texture(textureSource))?.pixels ?? null;
        }

        else if((renderer.type as RendererType) === RendererType.WEBGL)
        {
            pixels = new Uint8ClampedArray(BYTES_PER_PIXEL * width * height);

            const renderTarget = renderer.renderTarget.getRenderTarget(textureSource);
            const glRenderTarget = renderer.renderTarget.getGpuRenderTarget(renderTarget);

            const gl = renderer.gl;

            gl.bindFramebuffer(gl.FRAMEBUFFER, glRenderTarget.resolveTargetFramebuffer);

            gl.readPixels(
                0,
                0,
                width,
                height,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                pixels
            );
        }

        if(!pixels) return false;

        //@ts-ignore
        textureSource.hitMap = pixels;

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

    public get skipMouseHandling(): boolean
    {
        return this._skipMouseHandling;
    }

    public set skipMouseHandling(flag: boolean)
    {
        this._skipMouseHandling = flag;
    }
}
