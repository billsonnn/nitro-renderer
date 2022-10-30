import { IDisposable } from './IDisposable';
import { IEventDispatcher } from './IEventDispatcher';
import { INitroLogger } from './INitroLogger';

export interface INitroManager extends IDisposable
{
    init(): void;
    logger: INitroLogger;
    events: IEventDispatcher;
    isLoaded: boolean;
    isLoading: boolean;
}
