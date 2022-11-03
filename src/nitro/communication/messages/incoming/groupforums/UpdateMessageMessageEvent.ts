import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { UpdateMessageMessageParser } from '../../parser';

export class UpdateMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UpdateMessageMessageParser);
    }

    public getParser(): UpdateMessageMessageParser
    {
        return this.parser as UpdateMessageMessageParser;
    }
}
