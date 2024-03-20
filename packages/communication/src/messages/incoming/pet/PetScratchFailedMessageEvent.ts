import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { PetScratchFailedMessageParser } from './../../parser';

export class PetScratchFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetScratchFailedMessageParser);
    }

    public getParser(): PetScratchFailedMessageParser
    {
        return this.parser as PetScratchFailedMessageParser;
    }
}
