import { IEventDispatcher } from '../events/IEventDispatcher';
import { IDisposable } from './disposable/IDisposable';
import { INitroLogger } from './logger/INitroLogger';

export interface INitroManager extends IDisposable
{
    init(): void;
    logger: INitroLogger;
    events: IEventDispatcher;
    isLoaded: boolean;
    isLoading: boolean;
}