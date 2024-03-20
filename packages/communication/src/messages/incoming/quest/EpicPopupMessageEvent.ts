import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { EpicPopupMessageParser } from '../../parser';

export class EpicPopupMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, EpicPopupMessageParser);
    }

    public getParser(): EpicPopupMessageParser
    {
        return this.parser as EpicPopupMessageParser;
    }
}
