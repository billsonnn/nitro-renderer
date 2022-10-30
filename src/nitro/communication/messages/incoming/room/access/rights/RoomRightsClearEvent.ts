import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../core/communication/messages/MessageEvent';
import { RoomRightsClearParser } from '../../../../parser/room/access/rights/RoomRightsClearParser';

export class RoomRightsClearEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomRightsClearParser);
    }

    public getParser(): RoomRightsClearParser
    {
        return this.parser as RoomRightsClearParser;
    }
}
