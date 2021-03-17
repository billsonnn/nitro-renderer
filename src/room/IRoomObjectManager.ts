import { AdvancedMap } from '../core/utils/AdvancedMap';
import { IRoomObjectController } from './object/IRoomObjectController';

export interface IRoomObjectManager
{
    dispose(): void;
    getObject(id: number): IRoomObjectController;
    getObjectByIndex(index: number): IRoomObjectController;
    createObject(id: number, stateCount: number, type: string): IRoomObjectController;
    removeObject(id: number): void;
    removeAllObjects(): void;
    objects: AdvancedMap<number, IRoomObjectController>;
    totalObjects: number;
}