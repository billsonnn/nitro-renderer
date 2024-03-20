import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { BotSkillListUpdateParser } from '../../../parser';

export class BotSkillListUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotSkillListUpdateParser);
    }

    public getParser(): BotSkillListUpdateParser
    {
        return this.parser as BotSkillListUpdateParser;
    }
}
