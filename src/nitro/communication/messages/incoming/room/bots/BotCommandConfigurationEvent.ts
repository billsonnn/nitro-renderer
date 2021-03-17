import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { BotCommandConfigurationParser } from '../../../parser/room/bots/BotCommandConfigurationParser';

export class BotCommandConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotCommandConfigurationParser);
    }

    public getParser(): BotCommandConfigurationParser
    {
        return this.parser as BotCommandConfigurationParser;
    }
}
