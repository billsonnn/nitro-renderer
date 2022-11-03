import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { TalentTrackParser } from '../../parser';

export class TalentTrackMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TalentTrackParser);
    }

    public getParser(): TalentTrackParser
    {
        return this.parser as TalentTrackParser;
    }
}
