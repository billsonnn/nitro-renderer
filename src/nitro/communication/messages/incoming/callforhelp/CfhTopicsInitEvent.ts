import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CfhTopicsInitMessageParser } from '../../parser';

export class CfhTopicsInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhTopicsInitMessageParser);
    }

    public getParser(): CfhTopicsInitMessageParser
    {
        return this.parser as CfhTopicsInitMessageParser;
    }
}
