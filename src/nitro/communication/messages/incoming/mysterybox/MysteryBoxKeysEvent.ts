import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { MysteryBoxKeysParser } from '../../parser';

export class MysteryBoxKeysEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MysteryBoxKeysParser);
    }

    public getParser(): MysteryBoxKeysParser
    {
        return this.parser as MysteryBoxKeysParser;
    }
}
