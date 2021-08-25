import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HabboBroadcastMessageParser } from '../../parser/notifications/HabboBroadcastMessageParser';

export class HabboBroadcastMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboBroadcastMessageParser);
    }

    public getParser(): HabboBroadcastMessageParser
    {
        return this.parser as HabboBroadcastMessageParser;
    }
}
