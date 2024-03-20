import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { HabboClubOffersMessageParser } from '../../parser';

export class HabboClubOffersMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboClubOffersMessageParser);
    }

    public getParser(): HabboClubOffersMessageParser
    {
        return this.parser as HabboClubOffersMessageParser;
    }
}
