import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { FlatControllerRemovedParser } from '../../parser/roomsettings/FlatControllerRemovedParser';

export class FlatControllerRemovedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatControllerRemovedParser);
    }

    public getParser(): FlatControllerRemovedParser
    {
        return this.parser as FlatControllerRemovedParser;
    }
}
