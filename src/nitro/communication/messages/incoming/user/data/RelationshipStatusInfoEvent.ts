import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { RelationshipStatusInfoMessageParser } from '../../../parser/user/data/RelationshipStatusInfoMessageParser';

export class RelationshipStatusInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RelationshipStatusInfoMessageParser);
    }

    public getParser(): RelationshipStatusInfoMessageParser
    {
        return this.parser as RelationshipStatusInfoMessageParser;
    }
}
