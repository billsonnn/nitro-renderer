import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModtoolUserChatlogParser } from '../../parser/modtool/ModtoolUserChatlogParser';

export class ModtoolUserChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolUserChatlogParser);
    }

    public getParser(): ModtoolUserChatlogParser
    {
        return this.parser as ModtoolUserChatlogParser;
    }
}
