import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { CfhChatlogMessageParser } from '../../parser';

export class CfhChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhChatlogMessageParser);
    }

    public getParser(): CfhChatlogMessageParser
    {
        return this.parser as CfhChatlogMessageParser;
    }
}
