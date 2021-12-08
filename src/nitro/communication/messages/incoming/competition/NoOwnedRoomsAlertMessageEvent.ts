import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { NoOwnedRoomsAlertMessageParser } from '../../parser';

export class NoOwnedRoomsAlertMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoOwnedRoomsAlertMessageParser);
    }

    public getParser(): NoOwnedRoomsAlertMessageParser
    {
        return this.parser as NoOwnedRoomsAlertMessageParser;
    }
}
