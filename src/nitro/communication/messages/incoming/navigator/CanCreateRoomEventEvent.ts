import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CanCreateRoomEventParser } from '../../parser/navigator/CanCreateRoomEventParser';

export class CanCreateRoomEventEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CanCreateRoomEventParser);
    }

    public getParser(): CanCreateRoomEventParser
    {
        return this.parser as CanCreateRoomEventParser;
    }
}
