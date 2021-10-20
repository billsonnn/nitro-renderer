import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ModeratorRoomInfoMessageParser } from '../../parser/moderation/ModeratorRoomInfoMessageParser';

export class ModeratorRoomInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorRoomInfoMessageParser);
    }

    public getParser(): ModeratorRoomInfoMessageParser
    {
        return this.parser as ModeratorRoomInfoMessageParser;
    }
}
