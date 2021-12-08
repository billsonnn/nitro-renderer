import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { TalentTrackParser } from '../../parser/talent/TalentTrackParser';

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
