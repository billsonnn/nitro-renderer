import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
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
