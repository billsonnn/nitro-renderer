import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { TalentTrackParser } from '../../parser/help/TalentTrackParser';

export class TalentTrackEvent extends MessageEvent implements IMessageEvent
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
