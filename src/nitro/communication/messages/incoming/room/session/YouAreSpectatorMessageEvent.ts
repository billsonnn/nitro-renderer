import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { YouAreSpectatorMessageParser } from '../../../parser/room/session/YouAreSpectatorMessageParser';

export class YouAreSpectatorMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YouAreSpectatorMessageParser);
    }

    public getParser(): YouAreSpectatorMessageParser
    {
        return this.parser as YouAreSpectatorMessageParser;
    }
}
