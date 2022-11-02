import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { RoomScoreParser } from '../../../parser';

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
