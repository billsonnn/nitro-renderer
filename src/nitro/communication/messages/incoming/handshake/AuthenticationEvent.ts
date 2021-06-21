import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { AuthenticationParser } from '../../parser/handshake/AuthenticationParser';

export class AuthenticationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AuthenticationParser);
    }

    public getParser(): AuthenticationParser
    {
        return this.parser as AuthenticationParser;
    }
}
