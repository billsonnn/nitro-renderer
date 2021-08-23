import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModtoolMainParser } from '../../parser/modtool/ModtoolMainParser';

export class ModtoolMainEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolMainParser);
    }

    public getParser(): ModtoolMainParser
    {
        return this.parser as ModtoolMainParser;
    }
}
