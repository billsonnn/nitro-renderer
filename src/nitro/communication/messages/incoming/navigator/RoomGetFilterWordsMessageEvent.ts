import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { RoomGetFilterWordsMessageParser } from '../../parser';

export class RoomGetFilterWordsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomGetFilterWordsMessageParser);
    }

    public getParser(): RoomGetFilterWordsMessageParser
    {
        return this.parser as RoomGetFilterWordsMessageParser;
    }
}
