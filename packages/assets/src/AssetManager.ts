import { IAssetData, IAssetManager, IGraphicAsset, IGraphicAssetCollection } from '@nitrots/api';
import { NitroBundle, NitroLogger } from '@nitrots/utils';
import '@pixi/gif';
import { Assets, Spritesheet, SpritesheetData, Texture } from 'pixi.js';
import { GraphicAssetCollection } from './GraphicAssetCollection';

export class AssetManager implements IAssetManager
{
    private _textures: Map<string, Texture> = new Map();
    private _collections: Map<string, IGraphicAssetCollection> = new Map();

    public getTexture(name: string): Texture
    {
        if(!name) return null;

        return this._textures.get(name);
    }

    public setTexture(name: string, texture: Texture): void
    {
        if(!name || !texture) return;

        texture.label = name;

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

    public addAssetToCollection(collectionName: string, assetName: string, texture: Texture, override: boolean = true): boolean
    {
        const collection = this.getCollection(collectionName);

        if(!collection) return false;

        return collection.addAsset(assetName, texture, override, 0, 0, false, false);
    }

    public getCollection(name: string): IGraphicAssetCollection
    {
        if(!name) return null;

        return this._collections.get(name);
    }

    public createCollection(data: IAssetData, spritesheet: Spritesheet): IGraphicAssetCollection
    {
        if(!data) return null;

        const collection = new GraphicAssetCollection(data, spritesheet);

        for(const [name, texture] of collection.textures.entries()) this.setTexture(name, texture);

        this._collections.set(collection.name, collection);

        return collection;
    }

    public async downloadAssets(urls: string[]): Promise<boolean>
    {
        if(!urls || !urls.length) return Promise.resolve(true);

        const promises: Promise<boolean>[] = [];

        for(const url of urls) promises.push(this.downloadAsset(url));

        try
        {
            await Promise.all(promises);

            return true;
        }

        catch (err)
        {
            NitroLogger.error(err);
        }

        return false;
    }

    public async downloadAsset(url: string): Promise<boolean>
    {
        try
        {
            if(!url || !url.length) return false;

            if(url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.gif'))
            {
                const texture = await Assets.load<Texture>(url);

                this.setTexture(url, texture);

                return true;
            }

            const response = await fetch(url);

            if(response.status !== 200) return false;

            let contentType = 'application/octet-stream';

            if(response.headers.has('Content-Type')) contentType = response.headers.get('Content-Type');

            switch(contentType)
            {
                case 'application/octet-stream': {
                    const buffer = await response.arrayBuffer();
                    const nitroBundle = await NitroBundle.from(buffer);

                    await this.processAsset(nitroBundle.texture, nitroBundle.jsonFile as IAssetData);
                    break;
                }
            }

            return true;
        }

        catch (err)
        {
            NitroLogger.error(err);

            return false;
        }
    }

    private async processAsset(texture: Texture, data: IAssetData): Promise<void>
    {
        let spritesheet: Spritesheet<SpritesheetData> = null;

        if(texture && data?.spritesheet && Object.keys(data.spritesheet).length)
        {
            spritesheet = new Spritesheet(texture, data.spritesheet);

            await spritesheet.parse();

            spritesheet.textureSource.label = data.name ?? null;
        }

        this.createCollection(data, spritesheet);
    }

    public get collections(): Map<string, IGraphicAssetCollection>
    {
        return this._collections;
    }
}
