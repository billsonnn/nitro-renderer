import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { TalentTrackLevelMessageParser } from '../../parser';

export class TalentTrackLevelMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TalentTrackLevelMessageParser);
    }

    public getParser(): TalentTrackLevelMessageParser
    {
        return this.parser as TalentTrackLevelMessageParser;
    }
}
