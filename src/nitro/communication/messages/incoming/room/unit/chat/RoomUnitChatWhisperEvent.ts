import { IMessageEvent } from '../../../../../../../api';
import { MessageEvent } from '../../../../../../../events';
import { RoomUnitChatParser } from '../../../../parser';

export class RoomUnitChatWhisperEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomUnitChatParser);
    }

    public getParser(): RoomUnitChatParser
    {
        return this.parser as RoomUnitChatParser;
    }
}
