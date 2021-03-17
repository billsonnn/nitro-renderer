import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { AuthenticatedParser } from '../../parser/security/AuthenticatedParser';

export class AuthenticatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AuthenticatedParser);
    }

    public getParser(): AuthenticatedParser
    {
        return this.parser as AuthenticatedParser;
    }
}