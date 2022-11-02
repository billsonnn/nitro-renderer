import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CompetitionRoomsDataMessageParser } from '../../parser';

export class CompetitionRoomsDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionRoomsDataMessageParser);
    }

    public getParser(): CompetitionRoomsDataMessageParser
    {
        return this.parser as CompetitionRoomsDataMessageParser;
    }
}
