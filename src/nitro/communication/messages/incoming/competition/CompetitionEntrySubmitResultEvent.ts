import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CompetitionEntrySubmitResultMessageParser } from '../../parser';

export class CompetitionEntrySubmitResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionEntrySubmitResultMessageParser);
    }

    public getParser(): CompetitionEntrySubmitResultMessageParser
    {
        return this.parser as CompetitionEntrySubmitResultMessageParser;
    }
}
