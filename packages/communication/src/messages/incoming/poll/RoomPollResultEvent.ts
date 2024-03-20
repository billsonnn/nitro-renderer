import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { RoomPollResultParser } from '../../parser';

export class RoomPollResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomPollResultParser);
    }

    public getParser(): RoomPollResultParser
    {
        return this.parser as RoomPollResultParser;
    }
}
