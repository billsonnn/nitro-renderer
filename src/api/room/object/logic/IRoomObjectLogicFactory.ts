import { RoomObjectEvent } from '../../../../events';
import { IEventDispatcher } from '../../../common';
import { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory
{
    getLogic(type: string): IRoomObjectEventHandler;
    registerEventFunction(func: (event: RoomObjectEvent) => void): void;
    removeEventFunction(func: (event: RoomObjectEvent) => void): void;
    events: IEventDispatcher;
}
