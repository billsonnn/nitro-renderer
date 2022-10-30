import { ModeratorToolPreferencesMessageParser } from '../..';
import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';

export class ModeratorToolPreferencesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorToolPreferencesMessageParser);
    }

    public getParser(): ModeratorToolPreferencesMessageParser
    {
        return this.parser as ModeratorToolPreferencesMessageParser;
    }
}
