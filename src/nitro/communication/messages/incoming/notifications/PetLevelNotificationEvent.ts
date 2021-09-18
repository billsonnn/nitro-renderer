import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PetLevelNotificationParser } from '../../parser/notifications/PetLevelNotificationParser';

export class PetLevelNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetLevelNotificationParser);
    }

    public getParser(): PetLevelNotificationParser
    {
        return this.parser as PetLevelNotificationParser;
    }
}
