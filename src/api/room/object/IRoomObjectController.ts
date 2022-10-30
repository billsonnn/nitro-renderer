import { IRoomObjectUpdateMessage } from '../IRoomObjectUpdateMessage';
import { IVector3D } from '../IVector3D';
import { IRoomObject } from './IRoomObject';
import { IRoomObjectEventHandler } from './logic';
import { IRoomObjectGraphicVisualization } from './visualization';

export interface IRoomObjectController extends IRoomObject
{
    setLocation(vector: IVector3D): void;
    setDirection(vector: IVector3D): void;
    setState(state: number, index?: number): boolean;
    setVisualization(visualization: IRoomObjectGraphicVisualization): void;
    setLogic(logic: IRoomObjectEventHandler): void;
    processUpdateMessage(message: IRoomObjectUpdateMessage): void;
    tearDown(): void;
    isReady: boolean;
    logic: IRoomObjectEventHandler;
}
