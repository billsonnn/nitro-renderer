import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { GotMysteryBoxPrizeMessageParser } from '../../parser/mysterybox';

export class GotMysteryBoxPrizeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GotMysteryBoxPrizeMessageParser);
    }

    public getParser(): GotMysteryBoxPrizeMessageParser
    {
        return this.parser as GotMysteryBoxPrizeMessageParser;
    }
}
