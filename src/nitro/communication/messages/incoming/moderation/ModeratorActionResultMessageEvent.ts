import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModeratorActionResultMessageParser } from '../../parser/moderation/ModeratorActionResultMessageParser';

export class ModeratorActionResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorActionResultMessageParser);
    }

    public getParser(): ModeratorActionResultMessageParser
    {
        return this.parser as ModeratorActionResultMessageParser;
    }
}
