import { IMessageEvent, MessageEvent } from '../../../../../core';
import { OfficialSongIdMessageParser } from '../../parser';

export class OfficialSongIdMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OfficialSongIdMessageParser);
    }

    public getParser(): OfficialSongIdMessageParser
    {
        return this.parser as OfficialSongIdMessageParser;
    }
}
