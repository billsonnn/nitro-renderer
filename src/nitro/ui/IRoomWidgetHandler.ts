import { IDisposable } from '../../core/common/disposable/IDisposable';
import { NitroEvent } from '../../core/events/NitroEvent';
import { IRoomWidgetHandlerContainer } from './IRoomWidgetHandlerContainer';
import { RoomWidgetUpdateEvent } from './widget/events/RoomWidgetUpdateEvent';
import { RoomWidgetMessage } from './widget/messages/RoomWidgetMessage';

export interface IRoomWidgetHandler extends IDisposable
{
    update(): void;
    processWidgetMessage(message: RoomWidgetMessage): RoomWidgetUpdateEvent;
    processEvent(event: NitroEvent): void;
    type: string;
    messageTypes: string[];
    eventTypes: string[];
    container: IRoomWidgetHandlerContainer;
}