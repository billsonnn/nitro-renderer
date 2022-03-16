import { PetRespectNotificationParser } from '../..';
import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';

export class PetRespectNoficationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetRespectNotificationParser);
    }

    public getParser(): PetRespectNotificationParser
    {
        return this.parser as PetRespectNotificationParser;
    }
}
