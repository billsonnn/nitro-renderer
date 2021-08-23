import { IMessageEvent, MessageEvent } from '../../../../../core';
import { WiredFurniActionParser } from '../../parser/roomevents/WiredFurniActionParser';

export class WiredFurniActionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniActionParser);
    }

    public getParser(): WiredFurniActionParser
    {
        return this.parser as WiredFurniActionParser;
    }
}
