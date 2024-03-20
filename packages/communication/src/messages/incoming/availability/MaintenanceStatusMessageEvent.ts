import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { MaintenanceStatusMessageParser } from '../../parser';

export class MaintenanceStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MaintenanceStatusMessageParser);
    }

    public getParser(): MaintenanceStatusMessageParser
    {
        return this.parser as MaintenanceStatusMessageParser;
    }
}
