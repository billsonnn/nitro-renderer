import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { UpdateThreadMessageParser } from '../../parser';

export class UpdateThreadMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UpdateThreadMessageParser);
    }

    public getParser(): UpdateThreadMessageParser
    {
        return this.parser as UpdateThreadMessageParser;
    }
}
