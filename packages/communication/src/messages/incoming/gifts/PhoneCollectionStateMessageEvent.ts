import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { PhoneCollectionStateParser } from '../../parser';

export class PhoneCollectionStateMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PhoneCollectionStateParser);
    }

    public getParser(): PhoneCollectionStateParser
    {
        return this.parser as PhoneCollectionStateParser;
    }
}
