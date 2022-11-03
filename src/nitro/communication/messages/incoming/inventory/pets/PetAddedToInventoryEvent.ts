import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PetAddedToInventoryParser } from '../../../parser';

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
