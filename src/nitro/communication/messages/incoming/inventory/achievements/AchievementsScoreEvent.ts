import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { AchievementsScoreParser } from '../../../parser/inventory/achievements/AchievementsScoreParser';

export class AchievementsScoreEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementsScoreParser);
    }

    public getParser(): AchievementsScoreParser
    {
        return this.parser as AchievementsScoreParser;
    }
}
