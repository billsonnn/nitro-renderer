import { INitroLogger } from '../common';
import { IDisposable } from '../common/disposable/IDisposable';
import { NitroEvent } from './NitroEvent';

export interface IEventDispatcher extends IDisposable
{
    addEventListener(type: string, callback: Function): void
    removeEventListener(type: string, callback: Function): void;
    removeAllListeners(): void;
    dispatchEvent(event: NitroEvent): boolean;
    logger: INitroLogger;
}
