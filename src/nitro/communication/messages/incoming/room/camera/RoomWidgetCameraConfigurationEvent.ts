import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomWidgetCameraConfigurationParser } from '../../../parser/room/camera/RoomWidgetCameraConfigurationParser';

export class RoomWidgetCameraConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomWidgetCameraConfigurationParser);
    }

    public getParser(): RoomWidgetCameraConfigurationParser
    {
        return this.parser as RoomWidgetCameraConfigurationParser;
    }
}
