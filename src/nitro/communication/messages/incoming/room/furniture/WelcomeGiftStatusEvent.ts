import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
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
