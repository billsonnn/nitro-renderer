import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PetBreedingMessageParser } from './../../../parser';

export class PetBreedingMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetBreedingMessageParser);
    }

    public getParser(): PetBreedingMessageParser
    {
        return this.parser as PetBreedingMessageParser;
    }
}
