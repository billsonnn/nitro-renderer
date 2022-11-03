import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { GetForumsListMessageParser } from '../../parser';

export class ForumsListMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GetForumsListMessageParser);
    }

    public getParser(): GetForumsListMessageParser
    {
        return this.parser as GetForumsListMessageParser;
    }
}
