import { RoomWidgetUpdateEvent } from './events/RoomWidgetUpdateEvent';
import { RoomWidgetMessage } from './messages/RoomWidgetMessage';

export interface IRoomWidgetMessageListener
{
    processWidgetMessage(message: RoomWidgetMessage): RoomWidgetUpdateEvent;
}