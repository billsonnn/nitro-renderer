import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { UserRelationshipsParser } from '../../../parser/user/data/UserRelationshipsParser';

export class UserRelationshipsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserRelationshipsParser);
    }

    public getParser(): UserRelationshipsParser
    {
        return this.parser as UserRelationshipsParser;
    }
}