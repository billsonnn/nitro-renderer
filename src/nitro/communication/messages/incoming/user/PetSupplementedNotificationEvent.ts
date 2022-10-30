import { PetSupplementedNotificationParser } from '../..';
import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';

export class PetSupplementedNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetSupplementedNotificationParser);
    }

    public getParser(): PetSupplementedNotificationParser
    {
        return this.parser as PetSupplementedNotificationParser;
    }
}
