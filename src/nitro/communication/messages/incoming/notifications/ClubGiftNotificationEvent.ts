import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ClubGiftNotificationParser } from '../../parser';

export class ClubGiftNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClubGiftNotificationParser);
    }

    public getParser(): ClubGiftNotificationParser
    {
        return this.parser as ClubGiftNotificationParser;
    }
}
