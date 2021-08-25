import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { SanctionStatusMessageParser } from '../../parser/callforhelp';

export class SanctionStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SanctionStatusMessageParser);
    }

    public getParser(): SanctionStatusMessageParser
    {
        return this.parser as SanctionStatusMessageParser;
    }
}
