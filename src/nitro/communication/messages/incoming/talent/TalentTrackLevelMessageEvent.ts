import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
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
