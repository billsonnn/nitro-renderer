import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomWidgetCameraPublishedParser } from '../../../parser/room/camera/RoomWidgetCameraPublishedParser';

export class RoomWidgetCameraPublishedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomWidgetCameraPublishedParser);
    }

    public getParser(): RoomWidgetCameraPublishedParser
    {
        return this.parser as RoomWidgetCameraPublishedParser;
    }
}
