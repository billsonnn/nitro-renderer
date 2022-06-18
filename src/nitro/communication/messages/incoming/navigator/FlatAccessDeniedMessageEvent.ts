import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FlatAccessDeniedMessageParser } from '../../parser/navigator/FlatAccessDeniedMessageParser';

export class FlatAccessDeniedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatAccessDeniedMessageParser);
    }

    public getParser(): FlatAccessDeniedMessageParser
    {
        return this.parser as FlatAccessDeniedMessageParser;
    }
}
