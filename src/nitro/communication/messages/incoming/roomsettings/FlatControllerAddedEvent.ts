import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { FlatControllerAddedParser } from '../../parser/roomsettings/FlatControllerAddedParser';

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
