import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { WelcomeGiftChangeEmailResultParser } from '../../parser';

export class WelcomeGiftChangeEmailResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WelcomeGiftChangeEmailResultParser);
    }

    public getParser(): WelcomeGiftChangeEmailResultParser
    {
        return this.parser as WelcomeGiftChangeEmailResultParser;
    }
}
