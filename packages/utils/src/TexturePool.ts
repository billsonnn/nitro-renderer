import { NitroLogger, TextureUtils } from '@nitrots/utils';
import { Texture } from 'pixi.js';

export class TexturePool
{
    private static MAX_IDLE: number = 3600;

    private _textures: { [index: string]: { [index: string]: Texture[] } } = {};
    private _totalTextures: number = 0;
    private _runCount: number = 0;

    public getTotalTextures(): number
    {
        let total = 0;

        for(const width in this._textures)
        {
            for(const height in this._textures[width])
            {
                total += this._textures[width][height].length;
            }
        }

        this._totalTextures = total;

        return this._totalTextures;
    }

    public getTexture(width: number, height: number): Texture
    {
        if(!this._textures[width]) this._textures[width] = {};

        if(!this._textures[width][height]) this._textures[width][height] = [];

        if(this._textures[width][height].length)
        {
            const texture = this._textures[width][height].shift();

            if(texture)
            {
                this._totalTextures--;

                return texture;
            }
        }

        return TextureUtils.createRenderTexture(width, height);
    }

    public putTexture(texture: Texture)
    {
        if(!texture) return;

        if(!this._textures[texture.width]) this._textures[texture.width] = {};

        if(!this._textures[texture.width][texture.height]) this._textures[texture.width][texture.height] = [];

        //@ts-ignore
        delete texture.source.hitMap;

        this._textures[texture.width][texture.height].push(texture);

        this._totalTextures++;
    }

    public run(): void
    {
        this._runCount++;

        if(!this._totalTextures) return;

        for(const width in this._textures)
        {
            for(const height in this._textures[width])
            {
                const textures = this._textures[width][height];

                for(let i = textures.length - 1; i >= 0; i--)
                {
                    const texture = textures[i];
                    const source = texture.source;

                    if((source._touched > -1) && (this._runCount - source._touched) > TexturePool.MAX_IDLE)
                    {
                        //@ts-ignore
                        delete texture.source.hitMap;

                        if(!source.destroyed) texture.destroy(true);

                        this._textures[texture.width][texture.height].splice(i, 1);

                        this._totalTextures--;

                        NitroLogger.log(`[TexturePool] Texture disposed: ${texture.width}x${texture.height}`);
                    }
                }
            }
        }
    }

    public get textures(): { [index: string]: { [index: string]: Texture[] } }
    {
        return this._textures;
    }
}
