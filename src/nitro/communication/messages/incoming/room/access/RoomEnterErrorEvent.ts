import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomEnterErrorParser } from '../../../parser/room/access/RoomEnterErrorParser';

export class RoomEnterErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomEnterErrorParser);
    }

    public getParser(): RoomEnterErrorParser
    {
        return this.parser as RoomEnterErrorParser;
    }
}