import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PlayListMessageParser } from '../../parser';

export class PlayListMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PlayListMessageParser);
    }

    public getParser(): PlayListMessageParser
    {
        return this.parser as PlayListMessageParser;
    }
}
