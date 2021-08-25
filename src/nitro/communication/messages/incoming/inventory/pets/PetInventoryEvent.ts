import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { PetInventoryParser } from '../../../parser/inventory/pets/PetInventoryParser';

export class PetInventoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetInventoryParser);
    }

    public getParser(): PetInventoryParser
    {
        return this.parser as PetInventoryParser;
    }
}
