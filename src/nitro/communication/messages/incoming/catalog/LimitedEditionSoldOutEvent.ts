import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
