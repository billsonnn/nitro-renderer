import { IMessageEvent } from '../../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomRightsParser } from '../../../../parser/room/access/rights/RoomRightsParser';

export class RoomRightsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsParser);
    }

    public getParser(): RoomRightsParser
    {
        return this.parser as RoomRightsParser;
    }
}