import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PetRemovedFromInventoryParser } from '../../../parser';

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
