import { IGraphicAssetCollection, IRoomInstance, IRoomInstanceContainer, IRoomManager, IRoomManagerListener, IRoomObject, IRoomObjectController, IRoomObjectManager } from '@nitrots/api';
import { GetEventDispatcher, RoomContentLoadedEvent } from '@nitrots/events';
import { NitroLogger } from '@nitrots/utils';
import { GetRoomContentLoader } from './GetRoomContentLoader';
import { GetRoomObjectLogicFactory } from './GetRoomObjectLogicFactory';
import { GetRoomObjectVisualizationFactory } from './GetRoomObjectVisualizationFactory';
import { RoomInstance } from './RoomInstance';
import { RoomObjectManager } from './RoomObjectManager';

export class RoomManager implements IRoomManager, IRoomInstanceContainer
{
    private _rooms: Map<string, IRoomInstance> = new Map();
    private _updateCategories: number[] = [];

    private _listener: IRoomManagerListener;

    private _pendingContentTypes: string[] = [];
    private _skipContentProcessing: boolean = false;

    public async init(listener: IRoomManagerListener): Promise<void>
    {
        this._listener = listener;

        const onRoomContentLoadedEvent = (event: RoomContentLoadedEvent) =>
        {
            if(!GetRoomContentLoader()) return;

            const contentType = event.contentType;

            if(this._pendingContentTypes.indexOf(contentType) >= 0) return;

            this._pendingContentTypes.push(contentType);
        };

        GetEventDispatcher().addEventListener(RoomContentLoadedEvent.RCLE_SUCCESS, onRoomContentLoadedEvent);
        GetEventDispatcher().addEventListener(RoomContentLoadedEvent.RCLE_FAILURE, onRoomContentLoadedEvent);
        GetEventDispatcher().addEventListener(RoomContentLoadedEvent.RCLE_CANCEL, onRoomContentLoadedEvent);
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

        if(GetRoomContentLoader().isLoaderType(type))
        {
            asset = GetRoomContentLoader().getCollection(type);

            if(!asset)
            {
                isLoading = true;

                GetRoomContentLoader().downloadAsset(type);

                assetName = GetRoomContentLoader().getPlaceholderName(type);
                asset = GetRoomContentLoader().getCollection(assetName);

                if(!asset) return null;
            }

            visualization = asset.data.visualizationType;
            logic = asset.data.logicType;
        }

        const object = (instance.createRoomObject(objectId, 1, type, category) as IRoomObjectController);

        if(!object) return null;

        const visualizationInstance = GetRoomObjectVisualizationFactory().getVisualization(visualization);

        if(!visualizationInstance)
        {
            instance.removeRoomObject(objectId, category);

            return null;
        }

        visualizationInstance.asset = asset;

        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(assetName, visualization, ((asset && asset.data) || null));

        if(!visualizationData || !visualizationInstance.initialize(visualizationData))
        {
            instance.removeRoomObject(objectId, category);

            return null;
        }

        object.setVisualization(visualizationInstance);

        const logicInstance = GetRoomObjectLogicFactory().getLogic(logic);

        object.setLogic(logicInstance);

        if(logicInstance)
        {
            logicInstance.initialize((asset && asset.data) || null);
        }

        if(!isLoading) object.isReady = true;

        GetRoomContentLoader().setRoomObjectRoomId(object, roomId);

        return object;
    }

    private reinitializeRoomObjectsByType(type: string): void
    {
        if(!type || !GetRoomContentLoader()) return;

        const asset = GetRoomContentLoader().getCollection(type);

        if(!asset) return;

        const visualization = asset.data.visualizationType;
        const logic = asset.data.logicType;
        const visualizationData = GetRoomObjectVisualizationFactory().getVisualizationData(type, visualization, asset.data);

        for(const room of this._rooms.values())
        {
            if(!room) continue;

            for(const [category, manager] of room.managers.entries())
            {
                if(!manager) continue;

                for(const object of manager.objects.getValues())
                {
                    if(!object || object.type !== type) continue;

                    const visualizationInstance = GetRoomObjectVisualizationFactory().getVisualization(visualization);

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

                            const logicInstance = GetRoomObjectLogicFactory().getLogic(logic);

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

            const collection = GetRoomContentLoader().getCollection(type);

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
        }
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
}
