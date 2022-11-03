import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { MOTDNotificationParser } from '../../parser';

export class MOTDNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MOTDNotificationParser);
    }

    public getParser(): MOTDNotificationParser
    {
        return this.parser as MOTDNotificationParser;
    }
}
