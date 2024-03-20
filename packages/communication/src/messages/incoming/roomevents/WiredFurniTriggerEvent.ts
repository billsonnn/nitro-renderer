import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { WiredFurniTriggerParser } from '../../parser';

export class WiredFurniTriggerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniTriggerParser);
    }

    public getParser(): WiredFurniTriggerParser
    {
        return this.parser as WiredFurniTriggerParser;
    }
}
