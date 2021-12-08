import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { SecondsUntilMessageParser } from '../../parser';

export class SecondsUntilMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SecondsUntilMessageParser);
    }

    public getParser(): SecondsUntilMessageParser
    {
        return this.parser as SecondsUntilMessageParser;
    }
}
