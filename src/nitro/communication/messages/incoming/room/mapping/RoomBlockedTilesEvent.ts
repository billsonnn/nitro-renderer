import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomBlockedTilesParser } from '../../../parser/room/mapping/RoomBlockedTilesParser';

export class RoomBlockedTilesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomBlockedTilesParser);
    }

    public getParser(): RoomBlockedTilesParser
    {
        return this.parser as RoomBlockedTilesParser;
    }
}