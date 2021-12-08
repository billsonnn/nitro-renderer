import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { PetReceivedMessageParser } from '../../../parser/inventory/pets/PetReceivedMessageParser';

export class PetReceivedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetReceivedMessageParser);
    }

    public getParser(): PetReceivedMessageParser
    {
        return this.parser as PetReceivedMessageParser;
    }
}
