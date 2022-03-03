import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { PetStatusUpdateParser } from '../../../parser/room/pet/PetStatusUpdateParser';

export class PetStatusUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetStatusUpdateParser);
    }

    public getParser(): PetStatusUpdateParser
    {
        return this.parser as PetStatusUpdateParser;
    }
}
