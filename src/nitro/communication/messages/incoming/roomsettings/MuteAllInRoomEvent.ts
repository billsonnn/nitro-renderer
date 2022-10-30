import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { MuteAllInRoomParser } from '../../parser/roomsettings/MuteAllInRoomParser';

export class MuteAllInRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MuteAllInRoomParser);
    }

    public getParser(): MuteAllInRoomParser
    {
        return this.parser as MuteAllInRoomParser;
    }
}
