import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { HabboSearchResultParser } from '../../parser/friendlist/HabboSearchResultParser';

export class HabboSearchResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboSearchResultParser);
    }

    public getParser(): HabboSearchResultParser
    {
        return this.parser as HabboSearchResultParser;
    }
}
