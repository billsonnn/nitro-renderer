import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { PetLevelUpdateMessageParser } from '../../parser';

export class PetLevelUpdateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetLevelUpdateMessageParser);
    }

    public getParser(): PetLevelUpdateMessageParser
    {
        return this.parser as PetLevelUpdateMessageParser;
    }
}
