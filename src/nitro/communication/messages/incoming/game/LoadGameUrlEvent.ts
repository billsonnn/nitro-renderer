import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { LoadGameUrlParser } from '../../parser/game/LoadGameUrlParser';

export class LoadGameUrlEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoadGameUrlParser);
    }

    public getParser(): LoadGameUrlParser
    {
        return this.parser as LoadGameUrlParser;
    }
}
