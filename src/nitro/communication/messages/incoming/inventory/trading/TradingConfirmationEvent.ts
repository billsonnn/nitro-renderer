import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { TradingConfirmationParser } from '../../../parser/inventory/trading/TradingConfirmationParser';

export class TradingConfirmationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingConfirmationParser);
    }

    public getParser(): TradingConfirmationParser
    {
        return this.parser as TradingConfirmationParser;
    }
}
