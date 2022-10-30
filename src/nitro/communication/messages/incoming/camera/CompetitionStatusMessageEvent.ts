import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { CompetitionStatusMessageParser } from '../../parser/camera/CompetitionStatusMessageParser';

export class CompetitionStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionStatusMessageParser);
    }

    public getParser(): CompetitionStatusMessageParser
    {
        return this.parser as CompetitionStatusMessageParser;
    }
}
