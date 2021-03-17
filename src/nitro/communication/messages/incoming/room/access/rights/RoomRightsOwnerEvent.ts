import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomRightsOwnerParser } from '../../../../parser/room/access/rights/RoomRightsOwnerParser';

export class RoomRightsOwnerEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsOwnerParser);
    }

    public getParser(): RoomRightsOwnerParser
    {
        return this.parser as RoomRightsOwnerParser;
    }
}