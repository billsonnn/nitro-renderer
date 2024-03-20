import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
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
