import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModtoolUserInfoParser } from '../../parser/modtool/ModtoolUserInfoParser';

export class ModtoolUserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolUserInfoParser);
    }

    public getParser(): ModtoolUserInfoParser
    {
        return this.parser as ModtoolUserInfoParser;
    }
}
