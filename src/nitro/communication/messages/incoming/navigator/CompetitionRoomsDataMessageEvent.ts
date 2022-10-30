import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { CompetitionRoomsDataMessageParser } from '../../parser/navigator/CompetitionRoomsDataMessageParser';

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
