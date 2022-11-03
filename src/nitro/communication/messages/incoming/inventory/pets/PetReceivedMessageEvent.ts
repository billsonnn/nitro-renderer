import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { PetReceivedMessageParser } from '../../../parser';

export class PetReceivedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetReceivedMessageParser);
    }

    public getParser(): PetReceivedMessageParser
    {
        return this.parser as PetReceivedMessageParser;
    }
}
