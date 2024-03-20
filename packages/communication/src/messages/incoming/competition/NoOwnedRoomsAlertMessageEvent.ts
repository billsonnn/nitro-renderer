import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
