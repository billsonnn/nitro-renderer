import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { RoomPollDataParser } from '../../parser';

export class StartRoomPollEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomPollDataParser);
    }

    public getParser(): RoomPollDataParser
    {
        return this.parser as RoomPollDataParser;
    }
}
