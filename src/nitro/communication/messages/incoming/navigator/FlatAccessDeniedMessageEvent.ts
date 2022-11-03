import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FlatAccessDeniedMessageParser } from '../../parser';

export class FlatAccessDeniedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatAccessDeniedMessageParser);
    }

    public getParser(): FlatAccessDeniedMessageParser
    {
        return this.parser as FlatAccessDeniedMessageParser;
    }
}
