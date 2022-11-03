import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { MuteAllInRoomParser } from '../../parser';

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
