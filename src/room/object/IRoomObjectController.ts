import { RoomObjectUpdateMessage } from '../messages/RoomObjectUpdateMessage';
import { IVector3D } from '../utils/IVector3D';
import { IRoomObject } from './IRoomObject';
import { IRoomObjectEventHandler } from './logic/IRoomObjectEventHandler';
import { IRoomObjectGraphicVisualization } from './visualization/IRoomObjectGraphicVisualization';

export interface IRoomObjectController extends IRoomObject
{
    setLocation(vector: IVector3D): void;
    setDirection(vector: IVector3D): void;
    setState(state: number, index?: number): boolean;
    setVisualization(visualization: IRoomObjectGraphicVisualization): void;
    setLogic(logic: IRoomObjectEventHandler): void;
    processUpdateMessage(message: RoomObjectUpdateMessage): void;
    tearDown(): void;
    isReady: boolean;
    logic: IRoomObjectEventHandler;
}