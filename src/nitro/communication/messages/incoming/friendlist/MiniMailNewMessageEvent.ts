import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MiniMailNewMessageParser } from '../../parser/friendlist/MiniMailNewMessageParser';

export class MiniMailNewMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MiniMailNewMessageParser);
    }

    public getParser(): MiniMailNewMessageParser
    {
        return this.parser as MiniMailNewMessageParser;
    }
}
