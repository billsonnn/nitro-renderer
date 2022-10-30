import { IEventDispatcher } from '../events';
import { IDisposable } from './IDisposable';
import { INitroLogger } from './INitroLogger';

export interface INitroManager extends IDisposable
{
    init(): void;
    logger: INitroLogger;
    events: IEventDispatcher;
    isLoaded: boolean;
    isLoading: boolean;
}
