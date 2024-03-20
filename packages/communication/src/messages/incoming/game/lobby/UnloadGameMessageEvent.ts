import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { UnloadGameMessageParser } from '../../../parser';

export class UnloadGameMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UnloadGameMessageParser);
    }

    public getParser(): UnloadGameMessageParser
    {
        return this.parser as UnloadGameMessageParser;
    }
}
