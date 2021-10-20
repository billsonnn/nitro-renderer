import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CfhChatlogMessageParser } from '../../parser/moderation/CfhChatlogMessageParser';

export class CfhChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhChatlogMessageParser);
    }

    public getParser(): CfhChatlogMessageParser
    {
        return this.parser as CfhChatlogMessageParser;
    }
}
