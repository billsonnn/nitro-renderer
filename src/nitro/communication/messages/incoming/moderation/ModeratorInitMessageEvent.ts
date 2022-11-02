import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ModeratorInitMessageParser } from '../../parser';

export class ModeratorInitMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorInitMessageParser);
    }

    public getParser(): ModeratorInitMessageParser
    {
        return this.parser as ModeratorInitMessageParser;
    }
}
