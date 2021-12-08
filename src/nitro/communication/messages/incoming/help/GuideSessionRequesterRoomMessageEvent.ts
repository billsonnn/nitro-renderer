import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { GuideSessionRequesterRoomMessageParser } from '../../parser/help/GuideSessionRequesterRoomMessageParser';

export class GuideSessionRequesterRoomMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionRequesterRoomMessageParser);
    }

    public getParser(): GuideSessionRequesterRoomMessageParser
    {
        return this.parser as GuideSessionRequesterRoomMessageParser;
    }
}
