import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { LimitedEditionSoldOutParser } from '../../parser';

export class LimitedEditionSoldOutEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LimitedEditionSoldOutParser);
    }

    public getParser(): LimitedEditionSoldOutParser
    {
        return this.parser as LimitedEditionSoldOutParser;
    }
}
