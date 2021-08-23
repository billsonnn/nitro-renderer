import { IMessageEvent, MessageEvent } from '../../../../../core';
import { SeasonalQuestsParser } from '../../parser/quest/SeasonalQuestsParser';

export class SeasonalQuestsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SeasonalQuestsParser);
    }

    public getParser(): SeasonalQuestsParser
    {
        return this.parser as SeasonalQuestsParser;
    }
}
