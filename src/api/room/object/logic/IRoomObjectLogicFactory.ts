import { IEventDispatcher } from '../../../common';
import { IRoomObjectEventHandler } from './IRoomObjectEventHandler';

export interface IRoomObjectLogicFactory
{
    getLogic(type: string): IRoomObjectEventHandler;
    registerEventFunction(func: Function): void;
    removeEventFunction(func: Function): void;
    events: IEventDispatcher;
}
