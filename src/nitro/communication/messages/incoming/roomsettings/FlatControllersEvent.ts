import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
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
