import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { AchievementParser } from '../../../parser/inventory/achievements/AchievementParser';

export class AchievementEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementParser);
    }

    public getParser(): AchievementParser
    {
        return this.parser as AchievementParser;
    }
}
