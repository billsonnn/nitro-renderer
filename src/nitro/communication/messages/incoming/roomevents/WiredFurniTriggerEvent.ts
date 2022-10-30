import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { WiredFurniTriggerParser } from '../../parser/roomevents/WiredFurniTriggerParser';

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
