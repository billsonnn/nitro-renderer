import { BaseTexture, ILoaderOptions, Loader, LoaderResource, Spritesheet, Texture } from 'pixi.js';
import { IAssetData } from '../../core/asset/interfaces';
import { NitroBundle } from '../../core/asset/NitroBundle';
import { INitroLogger } from '../../core/common/logger/INitroLogger';
import { NitroLogger } from '../../core/common/logger/NitroLogger';
import { IEventDispatcher } from '../../core/events/IEventDispatcher';
import { NitroEvent } from '../../core/events/NitroEvent';
import { RoomContentLoadedEvent } from '../../room/events/RoomContentLoadedEvent';
import { IRoomObject } from '../../room/object/IRoomObject';
import { GraphicAssetCollection } from '../../room/object/visualization/utils/GraphicAssetCollection';
import { IGraphicAssetCollection } from '../../room/object/visualization/utils/IGraphicAssetCollection';
import { Nitro } from '../Nitro';
import { FurnitureType } from '../session/furniture/FurnitureType';
import { IFurnitureData } from '../session/furniture/IFurnitureData';
import { IFurnitureDataListener } from '../session/furniture/IFurnitureDataListener';
import { ISessionDataManager } from '../session/ISessionDataManager';
import { IRoomContentListener } from './IRoomContentListener';
import { RoomObjectCategory } from './object/RoomObjectCategory';
import { RoomObjectUserType } from './object/RoomObjectUserType';
import { RoomObjectVariable } from './object/RoomObjectVariable';
import { RoomObjectVisualizationType } from './object/RoomObjectVisualizationType';

export class RoomContentLoader implements IFurnitureDataListener
{
    private static PLACE_HOLDER: string         = 'place_holder';
    private static PLACE_HOLDER_WALL: string    = 'place_holder_wall';
    private static PLACE_HOLDER_PET: string     = 'place_holder_pet';
    private static PLACE_HOLDER_DEFAULT: string = RoomContentLoader.PLACE_HOLDER;
    private static ROOM: string                 = 'room';
    private static TILE_CURSOR: string          = 'tile_cursor';
    private static SELECTION_ARROW: string      = 'selection_arrow';

    public static LOADER_READY: string          = 'RCL_LOADER_READY';
    public static MANDATORY_LIBRARIES: string[] = [ RoomContentLoader.PLACE_HOLDER, RoomContentLoader.PLACE_HOLDER_WALL, RoomContentLoader.PLACE_HOLDER_PET, RoomContentLoader.ROOM, RoomContentLoader.TILE_CURSOR, RoomContentLoader.SELECTION_ARROW ];

    private _logger: INitroLogger;
    private _stateEvents: IEventDispatcher;
    private _sessionDataManager: ISessionDataManager;
    private _waitingForSessionDataManager: boolean;
    private _iconListener: IRoomContentListener;
    private _collections: Map<string, IGraphicAssetCollection>;
    private _images: Map<string, HTMLImageElement>;

    private _events: Map<string, IEventDispatcher>;
    private _activeObjects: { [index: string]: number };
    private _activeObjectTypes: Map<number, string>;
    private _activeObjectTypeIds: Map<string, number>;
    private _objectTypeAdUrls: Map<string, string>;
    private _wallItems: { [index: string]: number };
    private _wallItemTypes: Map<number, string>;
    private _wallItemTypeIds: Map<string, number>;
    private _furniRevisions: Map<string, number>;
    private _pets: { [index: string]: number };
    private _objectAliases: Map<string, string>;
    private _objectOriginalNames: Map<string, string>;

    private _pendingContentTypes: string[];
    private _dataInitialized: boolean;

    constructor()
    {
        this._logger                        = new NitroLogger(this.constructor.name);
        this._stateEvents                   = null;
        this._sessionDataManager            = null;
        this._waitingForSessionDataManager  = false;
        this._iconListener                  = null;
        this._collections                   = new Map();
        this._images                        = new Map();

        this._events                        = new Map();
        this._activeObjects                 = {};
        this._activeObjectTypes             = new Map();
        this._activeObjectTypeIds           = new Map();
        this._objectTypeAdUrls              = new Map();
        this._wallItems                     = {};
        this._wallItemTypes                 = new Map();
        this._wallItemTypeIds               = new Map();
        this._furniRevisions                = new Map();
        this._pets                          = {};
        this._objectAliases                 = new Map();
        this._objectOriginalNames           = new Map();

        this._pendingContentTypes           = [];
        this._dataInitialized               = false;
    }

    public initialize(events: IEventDispatcher): void
    {
        this._stateEvents = events;

        this.setFurnitureData();

        for(const [ index, name ] of Nitro.instance.getConfiguration<string[]>('pet.types').entries()) this._pets[name] = index;
    }

    public dispose(): void
    {

    }

    public setSessionDataManager(sessionData: ISessionDataManager): void
    {
        this._sessionDataManager = sessionData;

        if(this._waitingForSessionDataManager)
        {
            this._waitingForSessionDataManager = false;

            this.setFurnitureData();
        }
    }

    public loadFurnitureData(): void
    {
        this.setFurnitureData();
    }

    private setFurnitureData(): void
    {
        if(!this._sessionDataManager)
        {
            this._waitingForSessionDataManager = true;

            return;
        }

        const furnitureData = this._sessionDataManager.getAllFurnitureData(this);

        if(!furnitureData) return;

        this._sessionDataManager.removePendingFurniDataListener(this);

        this.processFurnitureData(furnitureData);

        this._stateEvents.dispatchEvent(new NitroEvent(RoomContentLoader.LOADER_READY));
    }

    private processFurnitureData(furnitureData: IFurnitureData[]): void
    {
        if(!furnitureData) return;

        for(const furniture of furnitureData)
        {
            if(!furniture) continue;

            const id = furniture.id;

            let className = furniture.className;

            if(furniture.hasIndexedColor) className = ((className + '*') + furniture.colorIndex);

            const revision  = furniture.revision;
            const adUrl     = furniture.adUrl;

            if(adUrl && adUrl.length > 0) this._objectTypeAdUrls.set(className, adUrl);

            let name = furniture.className;

            if(furniture.type === FurnitureType.FLOOR)
            {
                this._activeObjectTypes.set(id, className);
                this._activeObjectTypeIds.set(className, id);

                if(!this._activeObjects[name]) this._activeObjects[name] = 1;
            }

            else if(furniture.type === FurnitureType.WALL)
            {
                if(name === 'post.it')
                {
                    className   = 'post_it';
                    name        = 'post_it';
                }

                if(name === 'post.it.vd')
                {
                    className   = 'post_it_vd';
                    name        = 'post_id_vd';
                }

                this._wallItemTypes.set(id, className);
                this._wallItemTypeIds.set(className, id);

                if(!this._wallItems[name]) this._wallItems[name] = 1;
            }

            const existingRevision = this._furniRevisions.get(name);

            if(revision > existingRevision)
            {
                this._furniRevisions.delete(name);
                this._furniRevisions.set(name, revision);
            }
        }
    }

    public getFurnitureFloorNameForTypeId(typeId: number): string
    {
        const type = this._activeObjectTypes.get(typeId);

        return this.removeColorIndex(type);
    }

    public getFurnitureWallNameForTypeId(typeId: number, extra: string = null): string
    {
        let type = this._wallItemTypes.get(typeId);

        if((type === 'poster') && (extra !== null)) type = (type + extra);

        return this.removeColorIndex(type);
    }

    public getFurnitureFloorColorIndex(typeId: number): number
    {
        const type = this._activeObjectTypes.get(typeId);

        if(!type) return -1;

        return this.getColorIndexFromName(type);
    }

    public getFurnitureWallColorIndex(typeId: number): number
    {
        const type = this._wallItemTypes.get(typeId);

        if(!type) return -1;

        return this.getColorIndexFromName(type);
    }

    private getColorIndexFromName(name: string): number
    {
        if(!name) return -1;

        const index = name.indexOf('*');

        if(index === -1) return 0;

        return parseInt(name.substr(index + 1));
    }

    private removeColorIndex(name: string): string
    {
        if(!name) return null;

        const index = name.indexOf('*');

        if(index === -1) return name;

        return name.substr(0, index);
    }

    public getCollection(name: string): IGraphicAssetCollection
    {
        if(!name) return null;

        const existing = this._collections.get(name);

        if(!existing)
        {
            const globalCollection = Nitro.instance.core.asset.getCollection(name);

            if(globalCollection)
            {
                this._collections.set(name, globalCollection);

                return globalCollection;
            }

            return null;
        }

        return existing;
    }

    public getImage(name: string): HTMLImageElement
    {
        if(!name) return null;

        const existing = this._images.get(name);

        if(!existing) return null;

        const image = new Image();

        image.src = existing.src;

        return image;
    }

    public addAssetToCollection(collectionName: string, assetName: string, texture: Texture): boolean
    {
        const collection = this.getCollection(collectionName);

        if(!collection) return false;

        return collection.addAsset(assetName, texture, true, 0, 0, false, false);
    }

    private createCollection(data: IAssetData, spritesheet: Spritesheet): GraphicAssetCollection
    {
        if(!data || !spritesheet) return null;

        const collection = new GraphicAssetCollection(data, spritesheet);

        this._collections.set(collection.name, collection);
    }

    public getPlaceholderName(type: string): string
    {
        const category = this.getCategoryForType(type);

        switch(category)
        {
            case RoomObjectCategory.FLOOR:
                return RoomContentLoader.PLACE_HOLDER;
            case RoomObjectCategory.WALL:
                return RoomContentLoader.PLACE_HOLDER_WALL;
            default:
                if(this._pets[type] !== undefined) return RoomContentLoader.PLACE_HOLDER_PET;

                return RoomContentLoader.PLACE_HOLDER_DEFAULT;
        }
    }

    public getCategoryForType(type: string): number
    {
        if(!type) return RoomObjectCategory.MINIMUM;

        if(this._activeObjects[type] !== undefined) return RoomObjectCategory.FLOOR;

        if(this._wallItems[type] !== undefined) return RoomObjectCategory.WALL;

        if(this._pets[type] !== undefined) return RoomObjectCategory.UNIT;

        if(type.indexOf('poster') === 0) return RoomObjectCategory.WALL;

        if(type === 'room') return RoomObjectCategory.ROOM;

        if(type === RoomObjectUserType.USER) return RoomObjectCategory.UNIT;

        if(type === RoomObjectUserType.PET) return RoomObjectCategory.UNIT;

        if(type === RoomObjectUserType.BOT) return RoomObjectCategory.UNIT;

        if(type === RoomObjectUserType.RENTABLE_BOT) return RoomObjectCategory.UNIT;

        if(type === 'tile_cursor' || type === 'selection_arrow') return RoomObjectCategory.CURSOR;

        return RoomObjectCategory.MINIMUM;
    }

    public getPetNameForType(type: number): string
    {
        return Nitro.instance.getConfiguration<string[]>('pet.types')[type] || null;
    }

    public isLoaderType(type: string): boolean
    {
        type = RoomObjectUserType.getRealType(type);

        if(type === RoomObjectVisualizationType.USER) return false;

        return true;
    }

    public downloadImage(id: number, type: string, param: string, events: IEventDispatcher = null): boolean
    {
        let typeName: string    = null;
        let assetUrls: string[] = [];

        if(type && (type.indexOf(',') >= 0))
        {
            typeName    = type;
            type        = typeName.split(',')[0];
        }

        if(typeName)
        {
            assetUrls = this.getAssetUrls(typeName, param, true);
        }
        else
        {
            assetUrls = this.getAssetUrls(type, param, true);
        }

        if(assetUrls && assetUrls.length)
        {
            const url = assetUrls[0];

            const image = new Image();

            image.src = url;

            image.onload = () =>
            {
                image.onerror = null;

                this._images.set(([ type, param ].join('_')), image);

                this._iconListener.onRoomContentLoaded(id, [ type, param ].join('_'), true);
            };

            image.onerror = () =>
            {
                image.onload = null;

                this._logger.error('Failed to download asset: ' + url);

                this._iconListener.onRoomContentLoaded(id, [ type, param ].join('_'), false);
            };

            return true;
        }

        return false;
    }

    public downloadAsset(type: string, events: IEventDispatcher): boolean
    {
        const assetUrls: string[] = this.getAssetUrls(type);

        if(!assetUrls || !assetUrls.length) return false;

        if((this._pendingContentTypes.indexOf(type) >= 0) || this.getOrRemoveEventDispatcher(type)) return false;

        this._pendingContentTypes.push(type);
        this._events.set(type, events);

        const totalToDownload = assetUrls.length;
        let totalDownloaded = 0;

        const onDownloaded = (loader: Loader, resource: LoaderResource, flag: boolean) =>
        {
            if(loader) loader.destroy();

            if(!flag)
            {
                this._logger.error('Failed to download asset: ' + resource.url);

                events.dispatchEvent(new RoomContentLoadedEvent(RoomContentLoadedEvent.RCLE_FAILURE, type));

                return;
            }

            totalDownloaded++;

            if(totalDownloaded === totalToDownload)
            {
                const events = this._events.get(type);

                if(!events) return;

                events.dispatchEvent(new RoomContentLoadedEvent(RoomContentLoadedEvent.RCLE_SUCCESS, type));
            }
        };

        for(const url of assetUrls)
        {
            if(!url) continue;

            const loader = new Loader();

            const options: ILoaderOptions = {
                crossOrigin: false,
                xhrType: url.endsWith('.nitro') ? 'arraybuffer' : 'json'
            };

            loader
                .use((resource: LoaderResource, next: Function) => this.assetLoader(loader, resource, next, onDownloaded))
                .add(url, options)
                .load();
        }

        return true;
    }

    private assetLoader(loader: Loader, resource: LoaderResource, next: Function, onDownloaded: Function): void
    {
        if(!resource || resource.error)
        {
            if(resource && resource.texture) resource.texture.destroy(true);

            onDownloaded(loader, resource, false);

            return;
        }

        if(resource.extension === 'nitro')
        {
            const nitroBundle   = new NitroBundle(resource.data);
            const assetData     = (nitroBundle.jsonFile as IAssetData);

            if(!assetData || !assetData.type)
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

                    spritesheet.parse(textures =>
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

                        spritesheet.parse(textures =>
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

        else if(resource.type === LoaderResource.TYPE.JSON)
        {
            const assetData = (resource.data as IAssetData);

            if(!assetData.type)
            {
                onDownloaded(loader, resource, false);

                return;
            }

            if(assetData.spritesheet && Object.keys(assetData.spritesheet).length)
            {
                const imageName = (assetData.spritesheet.meta && assetData.spritesheet.meta.image);

                if(!imageName || !imageName.length)
                {
                    onDownloaded(loader, resource, false);

                    return;
                }

                const imageUrl      = (resource.url.substring(0, (resource.url.lastIndexOf('/') + 1)) + imageName);
                const baseTexture   = BaseTexture.from(imageUrl);

                if(baseTexture.valid)
                {
                    const spritesheet = new Spritesheet(baseTexture, assetData.spritesheet);

                    spritesheet.parse(textures =>
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

                        spritesheet.parse(textures =>
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
        else
        {
            onDownloaded(loader, resource, false);
        }
    }

    public setAssetAliasName(name: string, originalName: string): void
    {
        this._objectAliases.set(name, originalName);
        this._objectOriginalNames.set(originalName, name);
    }

    private getAssetAliasName(name: string): string
    {
        const existing = this._objectAliases.get(name);

        if(!existing) return name;

        return existing;
    }

    private getAssetOriginalName(name: string): string
    {
        const existing = this._objectOriginalNames.get(name);

        if(!existing) return name;

        return existing;
    }

    public getAssetUrls(type: string, param: string = null, icon: boolean = false): string[]
    {
        switch(type)
        {
            case RoomContentLoader.PLACE_HOLDER:
                return [ this.getAssetUrlWithRoomBase('place_holder') ];
            case RoomContentLoader.PLACE_HOLDER_WALL:
                return [ this.getAssetUrlWithRoomBase('place_holder_wall') ];
            case RoomContentLoader.PLACE_HOLDER_PET:
                return [ this.getAssetUrlWithRoomBase('place_holder_pet') ];
            case RoomContentLoader.ROOM:
                return [ this.getAssetUrlWithRoomBase('room') ];
            case RoomContentLoader.TILE_CURSOR:
                return [ this.getAssetUrlWithRoomBase('tile_cursor') ];
            case RoomContentLoader.SELECTION_ARROW:
                return [ this.getAssetUrlWithRoomBase('selection_arrow') ];
            default: {
                const category = this.getCategoryForType(type);

                if((category === RoomObjectCategory.FLOOR) || (category === RoomObjectCategory.WALL))
                {
                    const name = this.getAssetAliasName(type);

                    let assetUrl = (icon ? this.getAssetUrlWithFurniIconBase(name) : this.getAssetUrlWithFurniBase(type));

                    if(icon)
                    {
                        const active = (param && (param !== '') && (this._activeObjectTypeIds.has((name + '*' + param))));

                        assetUrl = (assetUrl.replace(/%param%/gi, (active ? ('_' + param) : '')));
                    }

                    return [ assetUrl ];
                }

                if(category === RoomObjectCategory.UNIT)
                {
                    return [ this.getAssetUrlWithPetBase(type) ];
                }

                return null;
            }
        }
    }

    public getAssetIconUrl(type: string, colorIndex: string): string
    {
        let assetName: string   = null;
        let assetUrls: string[] = [];

        if(type &&( type.indexOf(',') >= 0))
        {
            assetName = type;

            type = assetName.split(',')[0];
        }

        if(assetName)
        {
            assetUrls = this.getAssetUrls(assetName, colorIndex, true);
        }
        else
        {
            assetUrls = this.getAssetUrls(type, colorIndex, true);
        }

        if(assetUrls && assetUrls.length) return assetUrls[0];

        return null;
    }

    private getAssetUrlWithRoomBase(assetName: string): string
    {
        return (Nitro.instance.getConfiguration<string>('room.asset.url').replace(/%libname%/gi, assetName));
    }

    public getAssetUrlWithFurniBase(assetName: string): string
    {
        return (Nitro.instance.getConfiguration<string>('furni.asset.url').replace(/%libname%/gi, assetName));
    }

    public getAssetUrlWithFurniIconBase(assetName: string): string
    {
        return (Nitro.instance.getConfiguration<string>('furni.asset.icon.url').replace(/%libname%/gi, assetName));
    }

    public getAssetUrlWithPetBase(assetName: string): string
    {
        return (Nitro.instance.getConfiguration<string>('pet.asset.url').replace(/%libname%/gi, assetName));
    }

    public setRoomObjectRoomId(object: IRoomObject, roomId: string): void
    {
        const model = object && object.model;

        if(!model) return;

        model.setValue(RoomObjectVariable.OBJECT_ROOM_ID, roomId);
    }

    private getOrRemoveEventDispatcher(type: string, remove: boolean = false): IEventDispatcher
    {
        const existing = this._events.get(type);

        if(remove) this._events.delete(type);

        return existing;
    }

    public setIconListener(listener: IRoomContentListener): void
    {
        this._iconListener = listener;
    }
}
