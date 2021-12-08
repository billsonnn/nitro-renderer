import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { OneWayDoorStatusMessageParser } from '../../../parser/room/furniture/OneWayDoorStatusMessageParser';

export class OneWayDoorStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OneWayDoorStatusMessageParser);
    }

    public getParser(): OneWayDoorStatusMessageParser
    {
        return this.parser as OneWayDoorStatusMessageParser;
    }
}
