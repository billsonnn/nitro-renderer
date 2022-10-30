import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { GuestRoomSearchResultMessageParser } from '../../parser/navigator/GuestRoomSearchResultMessageParser';

export class GuestRoomSearchResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuestRoomSearchResultMessageParser);
    }

    public getParser(): GuestRoomSearchResultMessageParser
    {
        return this.parser as GuestRoomSearchResultMessageParser;
    }
}
