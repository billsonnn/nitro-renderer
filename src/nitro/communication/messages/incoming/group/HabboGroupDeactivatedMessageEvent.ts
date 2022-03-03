import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HabboGroupDeactivatedMessageParser } from '../../parser/group/HabboGroupDeactivatedMessageParser';

export class HabboGroupDeactivatedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupDeactivatedMessageParser);
    }

    public getParser(): HabboGroupDeactivatedMessageParser
    {
        return this.parser as HabboGroupDeactivatedMessageParser;
    }
}
