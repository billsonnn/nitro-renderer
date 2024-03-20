import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { ShowMysteryBoxWaitMessageParser } from '../../parser/mysterybox';

export class ShowMysteryBoxWaitMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ShowMysteryBoxWaitMessageParser);
    }

    public getParser(): ShowMysteryBoxWaitMessageParser
    {
        return this.parser as ShowMysteryBoxWaitMessageParser;
    }
}
