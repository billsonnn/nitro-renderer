import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModtoolRoomChatlogParser } from '../../parser/modtool/ModtoolRoomChatlogParser';

export class ModtoolRoomChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModtoolRoomChatlogParser);
    }

    public getParser(): ModtoolRoomChatlogParser
    {
        return this.parser as ModtoolRoomChatlogParser;
    }
}
