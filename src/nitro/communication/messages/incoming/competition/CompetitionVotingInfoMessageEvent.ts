import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
