import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { PetRemovedFromInventoryParser } from '../../../parser/inventory/pets/PetRemovedFromInventoryParser';

export class PetRemovedFromInventory extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetRemovedFromInventoryParser);
    }

    public getParser(): PetRemovedFromInventoryParser
    {
        return this.parser as PetRemovedFromInventoryParser;
    }
}
