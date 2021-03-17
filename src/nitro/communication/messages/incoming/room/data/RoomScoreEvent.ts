import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RoomScoreParser } from '../../../parser/room/data/RoomScoreParser';

export class RoomScoreEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomScoreParser);
    }

    public getParser(): RoomScoreParser
    {
        return this.parser as RoomScoreParser;
    }
}