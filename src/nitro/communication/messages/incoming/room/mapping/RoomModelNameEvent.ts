import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomModelNameParser } from '../../../parser/room/mapping/RoomModelNameParser';

export class RoomModelNameEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomModelNameParser);
    }

    public getParser(): RoomModelNameParser
    {
        return this.parser as RoomModelNameParser;
    }
}