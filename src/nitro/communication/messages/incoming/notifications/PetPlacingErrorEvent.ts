import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { PetPlacingErrorEventParser } from '../../parser/notifications/PetPlacingErrorEventParser';

export class PetPlacingErrorEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetPlacingErrorEventParser);
    }

    public getParser(): PetPlacingErrorEventParser
    {
        return this.parser as PetPlacingErrorEventParser;
    }
}
