import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
