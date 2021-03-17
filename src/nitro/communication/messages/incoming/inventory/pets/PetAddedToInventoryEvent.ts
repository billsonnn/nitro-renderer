import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { PetAddedToInventoryParser } from '../../../parser/inventory/pets/PetAddedToInventoryParser';

export class PetAddedToInventoryEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetAddedToInventoryParser);
    }

    public getParser(): PetAddedToInventoryParser
    {
        return this.parser as PetAddedToInventoryParser;
    }
}
