import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ConvertedRoomIdMessageParser } from '../../parser/navigator/ConvertedRoomIdMessageParser';

export class ConvertedRoomIdEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConvertedRoomIdMessageParser);
    }

    public getParser(): ConvertedRoomIdMessageParser
    {
        return this.parser as ConvertedRoomIdMessageParser;
    }
}
