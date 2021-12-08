import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { TargetedOfferParser } from '../../parser';

export class TargetedOfferEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TargetedOfferParser);
    }

    public getParser(): TargetedOfferParser
    {
        return this.parser as TargetedOfferParser;
    }
}
