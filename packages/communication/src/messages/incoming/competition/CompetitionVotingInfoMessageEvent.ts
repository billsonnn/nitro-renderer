import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { CompetitionVotingInfoMessageParser } from '../../parser';

export class CompetitionVotingInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionVotingInfoMessageParser);
    }

    public getParser(): CompetitionVotingInfoMessageParser
    {
        return this.parser as CompetitionVotingInfoMessageParser;
    }
}
