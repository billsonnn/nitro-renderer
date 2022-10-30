import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { FlatControllersParser } from '../../parser/roomsettings/FlatControllersParser';

export class FlatControllersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatControllersParser);
    }

    public getParser(): FlatControllersParser
    {
        return this.parser as FlatControllersParser;
    }
}
