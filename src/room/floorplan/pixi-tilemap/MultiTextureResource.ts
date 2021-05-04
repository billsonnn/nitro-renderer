import { resources } from '@pixi/core';
import { BaseTexture, Sprite, Texture } from 'pixi.js';

export interface IMultiTextureOptions {
    boundCountPerBuffer: number;
    boundSize: number;
    bufferSize: number;
    DO_CLEAR?: boolean;
}

export class MultiTextureResource extends resources.Resource
{
    constructor(options: IMultiTextureOptions)
    {
        super(options.bufferSize, options.bufferSize);

        const bounds = this.boundSprites;
        const dirties = this.dirties;
        this.boundSize = options.boundSize;
        for(let j = 0; j < options.boundCountPerBuffer; j++)
        {
            const spr = new Sprite();
            spr.position.x = options.boundSize * (j & 1);
            spr.position.y = options.boundSize * (j >> 1);
            bounds.push(spr);
            dirties.push(0);
        }
        this.DO_CLEAR = !!options.DO_CLEAR;
    }

    DO_CLEAR = false;
    boundSize: number = 0;
    _clearBuffer: Uint8Array = null;

    bind(baseTexture: BaseTexture)
    {
        if(this.baseTex)
        {
            throw new Error('Only one baseTexture is allowed for this resource!');
        }
        this.baseTex = baseTexture;
        super.bind(baseTexture);
    }

    baseTex: BaseTexture = null;
    boundSprites: Array<Sprite> = [];
    dirties: Array<number> = [];

    setTexture(ind: number, texture: Texture)
    {
        const spr = this.boundSprites[ind];
        if(spr.texture.baseTexture === texture.baseTexture)
        {
            return;
        }
        spr.texture = texture;
        this.baseTex.update();
        this.dirties[ind] = (this.baseTex as any).dirtyId;
    }

}
