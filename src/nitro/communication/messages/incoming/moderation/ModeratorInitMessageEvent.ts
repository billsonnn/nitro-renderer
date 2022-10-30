import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModeratorInitMessageParser } from '../../parser/moderation/ModeratorInitMessageParser';

export class ModeratorInitMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorInitMessageParser);
    }

    public getParser(): ModeratorInitMessageParser
    {
        return this.parser as ModeratorInitMessageParser;
    }
}
