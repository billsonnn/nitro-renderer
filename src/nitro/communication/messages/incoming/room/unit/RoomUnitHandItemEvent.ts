import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomUnitHandItemParser } from '../../../parser/room/unit/RoomUnitHandItemParser';

export class RoomUnitHandItemEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitHandItemParser);
    }

    public getParser(): RoomUnitHandItemParser
    {
        return this.parser as RoomUnitHandItemParser;
    }
}