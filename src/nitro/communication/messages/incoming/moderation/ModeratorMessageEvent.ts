import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModeratorMessageParser } from '../../parser/moderation/ModeratorMessageParser';

export class ModeratorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorMessageParser);
    }

    public getParser(): ModeratorMessageParser
    {
        return this.parser as ModeratorMessageParser;
    }
}
