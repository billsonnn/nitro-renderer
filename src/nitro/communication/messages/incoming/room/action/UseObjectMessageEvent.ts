import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { UseObjectMessageParser } from '../../../parser';

export class UseObjectMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UseObjectMessageParser);
    }

    public getParser(): UseObjectMessageParser
    {
        return this.parser as UseObjectMessageParser;
    }
}
