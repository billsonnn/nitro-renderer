import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NoobnessLevelMessageParser } from '../../parser/handshake/NoobnessLevelMessageParser';

export class NoobnessLevelMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoobnessLevelMessageParser);
    }

    public getParser(): NoobnessLevelMessageParser
    {
        return this.parser as NoobnessLevelMessageParser;
    }
}
