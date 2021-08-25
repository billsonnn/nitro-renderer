import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MiniMailUnreadCountParser } from '../../parser/friendlist/MiniMailUnreadCountParser';

export class MiniMailUnreadCountEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MiniMailUnreadCountParser);
    }

    public getParser(): MiniMailUnreadCountParser
    {
        return this.parser as MiniMailUnreadCountParser;
    }
}
