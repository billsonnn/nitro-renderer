import { IMessageEvent, MessageEvent } from '../../../../../core';
import { ModeratorMessageParser } from '../../parser/notifications/ModeratorMessageParser';

export class ModeratorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorMessageParser);
    }

    public getParser(): ModeratorMessageParser
    {
        return this.parser as ModeratorMessageParser;
    }
}
