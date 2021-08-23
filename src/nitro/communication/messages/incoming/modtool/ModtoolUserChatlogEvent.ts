import { IMessageEvent, MessageEvent } from '../../../../../core';
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
