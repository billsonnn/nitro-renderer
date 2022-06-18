import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
