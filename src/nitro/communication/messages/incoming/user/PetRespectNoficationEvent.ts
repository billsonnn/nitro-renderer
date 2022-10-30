import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { PetRespectNotificationParser } from '../../parser/user/PetRespectNotificationParser';

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
