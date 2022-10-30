import { IDisposable, IEventDispatcher } from '../../../common';
import { IRoomObjectUpdateMessage } from '../../IRoomObjectUpdateMessage';
import { IRoomObjectController } from '../IRoomObjectController';
import { IRoomObjectMouseHandler } from './IRoomObjectMouseHandler';

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler, IDisposable
{
    initialize(data: unknown): void;
    update(totalTimeRunning: number): void;
    processUpdateMessage(message: IRoomObjectUpdateMessage): void;
    getEventTypes(): string[];
    useObject(): void;
    setObject(object: IRoomObjectController): void;
    tearDown(): void;
    object: IRoomObjectController;
    eventDispatcher: IEventDispatcher;
    widget: string;
    contextMenu: string;
}
