import { IMessageEvent, MessageEvent } from '../../../../../core';
import { PetPlacingErrorEventParser } from '../../parser/notifications/PetPlacingErrorEventParser';

export class PetPlacingErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetPlacingErrorEventParser);
    }

    public getParser(): PetPlacingErrorEventParser
    {
        return this.parser as PetPlacingErrorEventParser;
    }
}
