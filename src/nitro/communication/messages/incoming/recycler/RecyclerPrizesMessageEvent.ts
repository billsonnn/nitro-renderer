import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RecyclerPrizesMessageParser } from '../../parser';

export class RecyclerPrizesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RecyclerPrizesMessageParser);
    }

    public getParser(): RecyclerPrizesMessageParser
    {
        return this.parser as RecyclerPrizesMessageParser;
    }
}
