import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ConvertedRoomIdMessageParser } from '../../parser';

export class ConvertedRoomIdEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ConvertedRoomIdMessageParser);
    }

    public getParser(): ConvertedRoomIdMessageParser
    {
        return this.parser as ConvertedRoomIdMessageParser;
    }
}
