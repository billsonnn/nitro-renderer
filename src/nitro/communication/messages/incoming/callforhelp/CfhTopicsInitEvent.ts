import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CfhTopicsInitMessageParser } from '../../parser/callforhelp/CfhTopicsInitMessageParser';

export class CfhTopicsInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhTopicsInitMessageParser);
    }

    public getParser(): CfhTopicsInitMessageParser
    {
        return this.parser as CfhTopicsInitMessageParser;
    }
}
