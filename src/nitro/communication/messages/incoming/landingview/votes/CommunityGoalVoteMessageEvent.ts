import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { CommunityVoteReceivedParser } from '../../../parser/landingview/votes/CommunityVoteReceivedParser';

export class CommunityGoalVoteMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityVoteReceivedParser);
    }

    public getParser(): CommunityVoteReceivedParser
    {
        return this.parser as CommunityVoteReceivedParser;
    }
}
