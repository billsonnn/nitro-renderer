import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CommunityGoalProgressMessageParser } from '../../parser/quest/CommunityGoalProgressMessageParser';

export class CommunityGoalProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalProgressMessageParser);
    }

    public getParser(): CommunityGoalProgressMessageParser
    {
        return this.parser as CommunityGoalProgressMessageParser;
    }
}
