import { BaseTexture, Resource, Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';
import { NitroLogger } from '../common';
import { ArrayBufferToBase64, NitroBundle } from '../utils';
import { GraphicAssetCollection } from './GraphicAssetCollection';
import { IAssetData } from './IAssetData';
import { IAssetManager } from './IAssetManager';
import { IGraphicAsset } from './IGraphicAsset';
import { IGraphicAssetCollection } from './IGraphicAssetCollection';

export class AssetManager implements IAssetManager
{
    public static _INSTANCE: IAssetManager = new AssetManager();

    private _textures: Map<string, Texture<Resource>> = new Map();
    private _collections: Map<string, IGraphicAssetCollection> = new Map();

    public getTexture(name: string): Texture<Resource>
    {
        if(!name) return null;

        const existing = this._textures.get(name);

        if(!existing) return null;

        return existing;
    }

    public setTexture(name: string, texture: Texture<Resource>): void
    {
        if(!name || !texture) return;

        this._textures.set(name, texture);
    }

    public getAsset(name: string): IGraphicAsset
    {
        if(!name) return null;

        for(const collection of this._collections.values())
        {
            if(!collection) continue;

            const existing = collection.getAsset(name);

            if(!existing) continue;

            return existing;
        }

        return null;
    }

    public getCollection(name: string): IGraphicAssetCollection
    {
        if(!name) return null;

        const existing = this._collections.get(name);

        if(!existing) return null;

        return existing;
    }

    public createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection
    {
        if(!data) return null;

        const collection = new GraphicAssetCollection(data, spritesheet);

        if(collection)
        {
            for(const [name, texture] of collection.textures.entries()) this.setTexture(name, texture);

            this._collections.set(collection.name, collection);
        }

        return collection;
    }

    public async downloadAsset(url: string): Promise<boolean>
    {
        return await this.downloadAssets([url]);
    }

    public async downloadAssets(urls: string[]): Promise<boolean>
    {
        if(!urls || !urls.length) return Promise.resolve(true);

        try
        {
            for(const url of urls)
            {
                const response = await fetch(url);

                if(response.status !== 200) continue;

                let contentType = 'application/octet-stream';

                if(response.headers.has('Content-Type'))
                {
                    contentType = response.headers.get('Content-Type');
                }

                switch(contentType)
                {
                    case 'application/octet-stream': {
                        const buffer = await response.arrayBuffer();
                        const nitroBundle = new NitroBundle(buffer);

                        await this.processAsset(
                            nitroBundle.baseTexture,
                            nitroBundle.jsonFile as IAssetData
                        );
                        break;
                    }
                    case 'image/png':
                    case 'image/jpeg':
                    case 'image/gif': {
                        const buffer = await response.arrayBuffer();
                        const base64 = ArrayBufferToBase64(buffer);
                        const baseTexture = BaseTexture.from(
                            `data:${ contentType };base64,${ base64 }`
                        );

                        const createAsset = async () =>
                        {
                            const texture = new Texture(baseTexture);
                            this.setTexture(url, texture);
                        };

                        if(baseTexture.valid)
                        {
                            await createAsset();
                        }
                        else
                        {
                            await new Promise<void>((resolve, reject) =>
                            {
                                baseTexture.once('update', async () =>
                                {
                                    await createAsset();

                                    return resolve();
                                });
                            });
                        }
                        break;
                    }
                }
            }

            return Promise.resolve(true);
        }
        catch (err)
        {
            NitroLogger.error(err);

            return Promise.resolve(false);
        }
    }

    private async processAsset(baseTexture: BaseTexture, data: IAssetData): Promise<void>
    {
        const spritesheetData = data.spritesheet;

        if(!baseTexture || !spritesheetData || !Object.keys(spritesheetData).length)
        {
            this.createCollection(data, null);

            return;
        }

        const createAsset = async () =>
        {
            const spritesheet = new Spritesheet(baseTexture, spritesheetData);

            await spritesheet.parse();

            this.createCollection(data, spritesheet);
        };

        if(baseTexture.valid)
        {
            await createAsset();
        }
        else
        {
            await new Promise<void>((resolve, reject) =>
            {
                baseTexture.once('update', async () =>
                {
                    await createAsset();

                    return resolve();
                });
            });
        }
    }

    public get collections(): Map<string, IGraphicAssetCollection>
    {
        return this._collections;
    }
}
