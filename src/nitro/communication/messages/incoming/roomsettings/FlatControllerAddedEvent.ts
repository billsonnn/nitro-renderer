import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
