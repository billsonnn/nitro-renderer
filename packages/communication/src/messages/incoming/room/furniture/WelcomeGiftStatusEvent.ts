import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { WelcomeGiftStatusParser } from '../../../parser';

export class WelcomeGiftStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WelcomeGiftStatusParser);
    }

    public getParser(): WelcomeGiftStatusParser
    {
        return this.parser as WelcomeGiftStatusParser;
    }
}
