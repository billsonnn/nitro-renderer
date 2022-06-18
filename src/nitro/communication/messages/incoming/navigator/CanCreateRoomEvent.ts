import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CanCreateRoomMessageParser } from '../../parser/navigator/CanCreateRoomMessageParser';

export class CanCreateRoomEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CanCreateRoomMessageParser);
    }

    public getParser(): CanCreateRoomMessageParser
    {
        return this.parser as CanCreateRoomMessageParser;
    }
}
