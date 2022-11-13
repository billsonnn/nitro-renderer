import { IGraphicAssetCollection, IRoomContentLoader, IRoomInstance, IRoomInstanceContainer, IRoomManager, IRoomManagerListener, IRoomObject, IRoomObjectController, IRoomObjectLogicFactory, IRoomObjectManager, IRoomObjectVisualizationFactory, NitroLogger } from '../api';
import { NitroManager } from '../core';
import { RoomContentLoadedEvent } from '../events';
import { RoomContentLoader } from '../nitro/room/RoomContentLoader';
import { RoomInstance } from './RoomInstance';
import { RoomObjectManager } from './RoomObjectManager';

export class RoomManager extends NitroManager implements IRoomManager, IRoomInstanceContainer
{
    public static ROOM_MANAGER_ERROR: number = -1;
    public static ROOM_MANAGER_LOADING: number = 0;
    public static ROOM_MANAGER_LOADED: number = 1;
    public static ROOM_MANAGER_INITIALIZING: number = 2;
    public static ROOM_MANAGER_INITIALIZED: number = 3;
    private static CONTENT_PROCESSING_TIME_LIMIT_MILLISECONDS: number = 40;

    private _state: number;
    private _rooms: Map<string, IRoomInstance>;
    private _contentLoader: IRoomContentLoader;
    private _updateCategories: number[];

    private _listener: IRoomManagerListener;
    private _visualizationFactory: IRoomObjectVisualizationFactory;
    private _logicFactory: IRoomObjectLogicFactory;

    private _initialLoadList: string[];
    private _pendingContentTypes: string[];
    private _skipContentProcessing: boolean;

    private _disposed: boolean;

    constructor(listener: IRoomManagerListener, visualizationFactory: IRoomObjectVisualizationFactory, logicFactory: IRoomObjectLogicFactory)
    {
        super();

        this._state = RoomManager.ROOM_MANAGER_LOADED;
        this._rooms = new Map();
        this._contentLoader = null;
        this._updateCategories = [];

        this._listener = listener;
        this._visualizationFactory = visualizationFactory;
        this._logicFactory = logicFactory;

        this._initialLoadList = [];
        this._pendingContentTypes = [];
        this._skipContentProcessing = false;

        this._disposed = false;

        this.onRoomContentLoadedEvent = this.onRoomContentLoadedEvent.bind(this);

        this.events.addEventListener(RoomContentLoadedEvent.RCLE_SUCCESS, this.onRoomContentLoadedEvent);
        this.events.addEventListener(RoomContentLoadedEvent.RCLE_FAILURE, this.onRoomContentLoadedEvent);
        this.events.addEventListener(RoomContentLoadedEvent.RCLE_CANCEL, this.onRoomContentLoadedEvent);
    }

    public onInit(): void
    {
        if(this._state >= RoomManager.ROOM_MANAGER_INITIALIZING || !this._contentLoader) return;

        const mandatoryLibraries = RoomContentLoader.MANDATORY_LIBRARIES;

        for(const library of mandatoryLibraries)
        {
            if(!library) continue;

            if(this._initialLoadList.indexOf(library) === -1)
            {
                this._contentLoader.downloadAsset(library, this.events);

                this._initialLoadList.push(library);
            }
        }

        this._state = RoomManager.ROOM_MANAGER_INITIALIZING;
    }

    public getRoomInstance(roomId: string): IRoomInstance
    {
        const existing = this._rooms.get(roomId);

        if(!existing) return null;

        return existing;
    }

    public createRoomInstance(roomId: string): IRoomInstance
    {
        if(this._rooms.get(roomId)) return null;

        const instance = new RoomInstance(roomId, this);

        this._rooms.set(instance.id, instance);

        if(this._updateCategories.length)
        {
            for(const category of this._updateCategories)
            {
                instance.addUpdateCategory(category);
            }
        }

        return instance;
    }

    public removeRoomInstance(roomId: string): boolean
    {
        const existing = this._rooms.get(roomId);

        if(!existing) return false;

        this._rooms.delete(roomId);

        existing.dispose();

        return true;
    }

    public createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        let visualization = type;
        let logic = type;
        let assetName = type;
        let asset: IGraphicAssetCollection = null;
        let isLoading = false;

        if(this._contentLoader.isLoaderType(type))
        {
            asset = this._contentLoader.getCollection(type);

            if(!asset)
            {
                isLoading = true;

                this._contentLoader.downloadAsset(type, this.events);

                assetName = this._contentLoader.getPlaceholderName(type);
                asset = this._contentLoader.getCollection(assetName);

                if(!asset) return null;
            }

            visualization = asset.data.visualizationType;
            logic = asset.data.logicType;
        }

        const object = (instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController);

        if(!object) return null;

        if(this._visualizationFactory)
        {
            const visualizationInstance = this._visualizationFactory.getVisualization(visualization);

            if(!visualizationInstance)
            {
                instance.removeRoomObject(objectId, category);

                return null;
            }

            visualizationInstance.asset = asset;

            const visualizationData = this._visualizationFactory.getVisualizationData(assetName, visualization, ((asset && asset.data) || null));

            if(!visualizationData || !visualizationInstance.initialize(visualizationData))
            {
                instance.removeRoomObject(objectId, category);

                return null;
            }

            object.setVisualization(visualizationInstance);
        }

        if(this._logicFactory)
        {
            const logicInstance = this._logicFactory.getLogic(logic);

            object.setLogic(logicInstance);

            if(logicInstance)
            {
                logicInstance.initialize((asset && asset.data) || null);
            }
        }

        if(!isLoading) object.isReady = true;

        this._contentLoader.setRoomObjectRoomId(object, roomId);

        return object;
    }

    private reinitializeRoomObjectsByType(type: string): void
    {
        if(!type || !this._contentLoader || !this._visualizationFactory || !this._logicFactory) return;

        const asset = this._contentLoader.getCollection(type);

        if(!asset) return;

        const visualization = asset.data.visualizationType;
        const logic = asset.data.logicType;
        const visualizationData = this._visualizationFactory.getVisualizationData(type, visualization, asset.data);

        for(const room of this._rooms.values())
        {
            if(!room) continue;

            for(const [category, manager] of room.managers.entries())
            {
                if(!manager) continue;

                for(const object of manager.objects.getValues())
                {
                    if(!object || object.type !== type) continue;

                    const visualizationInstance = this._visualizationFactory.getVisualization(visualization);

                    if(visualizationInstance)
                    {
                        visualizationInstance.asset = asset;

                        if(!visualizationData || !visualizationInstance.initialize(visualizationData))
                        {
                            manager.removeObject(object.id);
                        }
                        else
                        {
                            object.setVisualization(visualizationInstance);

                            const logicInstance = this._logicFactory.getLogic(logic);

                            object.setLogic(logicInstance);

                            if(logicInstance)
                            {
                                logicInstance.initialize(asset.data);
                            }

                            object.isReady = true;

                            if(this._listener) this._listener.objectInitialized(room.id, object.id, category);
                        }
                    }
                    else
                    {
                        manager.removeObject(object.id);
                    }
                }
            }
        }
    }

    public addUpdateCategory(category: number): void
    {
        const index = this._updateCategories.indexOf(category);

        if(index >= 0) return;

        this._updateCategories.push(category);

        if(!this._rooms.size) return;

        for(const room of this._rooms.values())
        {
            if(!room) continue;

            room.addUpdateCategory(category);
        }
    }

    public removeUpdateCategory(category: number): void
    {
        const index = this._updateCategories.indexOf(category);

        if(index === -1) return;

        this._updateCategories.splice(index, 1);

        if(!this._rooms.size) return;

        for(const room of this._rooms.values())
        {
            if(!room) continue;

            room.removeUpdateCategory(category);
        }
    }

    public setContentLoader(loader: IRoomContentLoader): void
    {
        if(this._contentLoader) this._contentLoader.dispose();

        this._contentLoader = loader;
    }

    private processPendingContentTypes(time: number): void
    {
        if(this._skipContentProcessing)
        {
            this._skipContentProcessing = false;

            return;
        }

        while(this._pendingContentTypes.length)
        {
            const type = this._pendingContentTypes.shift();

            const collection = this._contentLoader.getCollection(type);

            if(!collection)
            {
                if(this._listener)
                {
                    this._listener.initalizeTemporaryObjectsByType(type, false);
                }

                NitroLogger.log('Invalid Collection', type);

                continue;
            }

            this.reinitializeRoomObjectsByType(type);

            if(this._listener) this._listener.initalizeTemporaryObjectsByType(type, true);

            if(this._initialLoadList.length > 0) this.removeFromInitialLoad(type);
        }
    }

    private removeFromInitialLoad(type: string): void
    {
        if(!type || this._state === RoomManager.ROOM_MANAGER_ERROR) return;

        if(!this._contentLoader) this._state = RoomManager.ROOM_MANAGER_ERROR;

        if(this._contentLoader.getCollection(type))
        {
            const i = this._initialLoadList.indexOf(type);

            if(i >= 0) this._initialLoadList.splice(i, 1);

            if(!this._initialLoadList.length)
            {
                this._state = RoomManager.ROOM_MANAGER_INITIALIZED;

                if(this._listener)
                {
                    this._listener.onRoomEngineInitalized(true);
                }
            }
        }
        else
        {
            this._state = RoomManager.ROOM_MANAGER_ERROR;

            if(this._listener) this._listener.onRoomEngineInitalized(false);
        }
    }

    private onRoomContentLoadedEvent(event: RoomContentLoadedEvent): void
    {
        if(!this._contentLoader) return;

        const contentType = event.contentType;

        if(this._pendingContentTypes.indexOf(contentType) >= 0) return;

        this._pendingContentTypes.push(contentType);
    }

    public update(time: number, update: boolean = false): void
    {
        this.processPendingContentTypes(time);

        if(!this._rooms.size) return;

        for(const room of this._rooms.values()) room && room.update(time, update);
    }

    public createRoomObjectManager(category: number): IRoomObjectManager
    {
        return new RoomObjectManager();
    }

    public get rooms(): Map<string, IRoomInstance>
    {
        return this._rooms;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }
}
