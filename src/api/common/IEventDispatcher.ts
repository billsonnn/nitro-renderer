import { IDisposable } from './IDisposable';
import { INitroEvent } from './INitroEvent';
import { INitroLogger } from './INitroLogger';

export interface IEventDispatcher extends IDisposable
{
    addEventListener(type: string, callback: Function): void
    removeEventListener(type: string, callback: Function): void;
    removeAllListeners(): void;
    dispatchEvent(event: INitroEvent): boolean;
    logger: INitroLogger;
}
