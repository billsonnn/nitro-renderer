import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomWidgetCameraPurchaseSuccessfulParser } from '../../../parser/room/camera/RoomWidgetCameraPurchaseSuccessfulParser';

export class RoomWidgetCameraPurchaseSuccessfulEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomWidgetCameraPurchaseSuccessfulParser);
    }

    public getParser(): RoomWidgetCameraPurchaseSuccessfulParser
    {
        return this.parser as RoomWidgetCameraPurchaseSuccessfulParser;
    }
}
