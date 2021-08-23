import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModtoolCFHTopicsParser } from '../../parser/modtool/ModtoolCFHTopicsParser';

export class ModtoolCallForHelpTopicsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolCFHTopicsParser);
    }

    public getParser(): ModtoolCFHTopicsParser
    {
        return this.parser as ModtoolCFHTopicsParser;
    }
}
