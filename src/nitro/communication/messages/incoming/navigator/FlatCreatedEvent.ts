import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FlatCreatedMessageParser } from '../../parser/navigator/FlatCreatedMessageParser';

export class FlatCreatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatCreatedMessageParser);
    }

    public getParser(): FlatCreatedMessageParser
    {
        return this.parser as FlatCreatedMessageParser;
    }
}
