import { IEventDispatcher, INitroEvent } from '../../../common';
import { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory
{
    getLogic(type: string): IRoomObjectEventHandler;
    registerEventFunction(func: (event: INitroEvent) => void): void;
    removeEventFunction(func: (event: INitroEvent) => void): void;
    events: IEventDispatcher;
}
