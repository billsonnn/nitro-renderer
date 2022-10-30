import { IGraphicAssetCollection } from '../asset';
import { IEventDispatcher } from '../common';
import { IRoomObject } from '../room';

export interface IRoomContentLoader
{
    dispose: () => void;
    downloadAsset(type: string, events: IEventDispatcher): void;
    isLoaderType(type: string): boolean;
    getCollection(name: string): IGraphicAssetCollection;
    getPlaceholderName(type: string): string;
    setRoomObjectRoomId(object: IRoomObject, roomId: string): void;
}
