import { Resource, Texture } from '@pixi/core';
import { Loader, LoaderResource } from '@pixi/loaders';
import { Spritesheet } from '@pixi/spritesheet';
import { IGraphicAsset } from '../../room';
import { GraphicAssetCollection } from '../../room/object/visualization/utils/GraphicAssetCollection';
import { IGraphicAssetCollection } from '../../room/object/visualization/utils/IGraphicAssetCollection';
import { Disposable } from '../common/disposable/Disposable';
import { INitroLogger } from '../common/logger/INitroLogger';
import { NitroLogger } from '../common/logger/NitroLogger';
import { IAssetManager } from './IAssetManager';
import { IAssetData } from './interfaces';
import { NitroBundle } from './NitroBundle';

export class AssetManager extends Disposable implements IAssetManager
{
    private _logger: INitroLogger;
    private _textures: Map<string, Texture<Resource>>;
    private _collections: Map<string, IGraphicAssetCollection>;

    constructor()
    {
        super();

        this._logger = new NitroLogger(this.constructor.name);
        this._textures = new Map();
        this._collections = new Map();
    }

    public static removeFileExtension(name: string): string
    {
        return (name.substring(0, name.lastIndexOf('.')) || name);
    }

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
            for(const [ name, texture ] of collection.textures.entries()) this.setTexture(name, texture);

            this._collections.set(collection.name, collection);
        }

        return collection;
    }

    public downloadAsset(assetUrl: string, cb: Function): boolean
    {
        return this.downloadAssets([ assetUrl ], cb);
    }

    public downloadAssets(assetUrls: string[], cb: Function): boolean
    {
        if(!assetUrls || !assetUrls.length)
        {
            cb(true);

            return true;
        }

        const totalToDownload = assetUrls.length;

        let totalDownloaded = 0;

        const onDownloaded = (loader: Loader, resource: LoaderResource, flag: boolean) =>
        {
            if(loader) loader.destroy();

            if(!flag)
            {
                this._logger.error('Failed to download asset: ' + resource.url);

                cb(false);

                return;
            }

            totalDownloaded++;

            if(totalDownloaded === totalToDownload) cb(true);
        };

        for(const url of assetUrls)
        {
            if(!url) continue;

            const loader = new Loader();

            loader
                .add({
                    url,
                    crossOrigin: 'anonymous',
                    xhrType: url.endsWith('.nitro') ? LoaderResource.XHR_RESPONSE_TYPE.BUFFER : LoaderResource.XHR_RESPONSE_TYPE.JSON
                })
                .use((resource: LoaderResource, next: Function) =>
                {
                    this.assetLoader(loader, resource, onDownloaded);

                    next();
                })
                .load();
        }

        return true;
    }

    private assetLoader(loader: Loader, resource: LoaderResource, onDownloaded: Function): void
    {
        if(!resource || resource.error)
        {
            if(resource && resource.texture) resource.texture.destroy(true);

            onDownloaded(loader, resource, false);

            return;
        }

        if(resource.extension === 'nitro')
        {
            const nitroBundle = new NitroBundle(resource.data);
            const assetData = (nitroBundle.jsonFile as IAssetData);

            if(!assetData)
            {
                onDownloaded(loader, resource, false);

                return;
            }

            if(assetData.spritesheet && Object.keys(assetData.spritesheet).length)
            {
                const baseTexture = nitroBundle.baseTexture;

                if(!baseTexture)
                {
                    onDownloaded(loader, resource, false);

                    return;
                }

                if(baseTexture.valid)
                {
                    const spritesheet = new Spritesheet(baseTexture, assetData.spritesheet);

                    spritesheet.parse(() =>
                    {
                        this.createCollection(assetData, spritesheet);

                        onDownloaded(loader, resource, true);
                    });
                }
                else
                {
                    baseTexture.once('loaded', () =>
                    {
                        baseTexture.removeAllListeners();

                        const spritesheet = new Spritesheet(baseTexture, assetData.spritesheet);

                        spritesheet.parse(() =>
                        {
                            this.createCollection(assetData, spritesheet);

                            onDownloaded(loader, resource, true);
                        });
                    });

                    baseTexture.once('error', () =>
                    {
                        baseTexture.removeAllListeners();

                        onDownloaded(loader, resource, false);
                    });
                }

                return;
            }

            this.createCollection(assetData, null);

            onDownloaded(loader, resource, true);
        }

        else if(resource.type === LoaderResource.TYPE.IMAGE)
        {
            if(resource.texture.valid)
            {
                this.setTexture(resource.name, resource.texture);

                onDownloaded(loader, resource, true);
            }
            else
            {
                onDownloaded(loader, resource, false);
            }

            return;
        }
    }

    public get collections(): Map<string, IGraphicAssetCollection>
    {
        return this._collections;
    }
}
