import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { CompetitionEntrySubmitResultMessageParser } from '../../parser';

export class CompetitionEntrySubmitResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionEntrySubmitResultMessageParser);
    }

    public getParser(): CompetitionEntrySubmitResultMessageParser
    {
        return this.parser as CompetitionEntrySubmitResultMessageParser;
    }
}
