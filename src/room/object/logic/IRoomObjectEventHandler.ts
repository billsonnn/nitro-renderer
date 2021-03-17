import { IDisposable } from '../../../core/common/disposable/IDisposable';
import { IEventDispatcher } from '../../../core/events/IEventDispatcher';
import { RoomObjectUpdateMessage } from '../../messages/RoomObjectUpdateMessage';
import { IRoomObjectController } from '../IRoomObjectController';
import { IRoomObjectMouseHandler } from './IRoomObjectMouseHandler';

export interface IRoomObjectEventHandler extends IRoomObjectMouseHandler, IDisposable
{
    initialize(data: unknown): void;
    update(totalTimeRunning: number): void;
    processUpdateMessage(message: RoomObjectUpdateMessage): void;
    getEventTypes(): string[];
    useObject(): void;
    setObject(object: IRoomObjectController): void;
    tearDown(): void;
    object: IRoomObjectController;
    eventDispatcher: IEventDispatcher;
    widget: string;
    contextMenu: string;
}