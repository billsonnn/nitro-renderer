import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FlatControllerAddedParser } from '../../parser';

export class FlatControllerAddedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatControllerAddedParser);
    }

    public getParser(): FlatControllerAddedParser
    {
        return this.parser as FlatControllerAddedParser;
    }
}
