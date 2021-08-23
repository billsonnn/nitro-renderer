import { IMessageEvent, MessageEvent } from '../../../../../core';
import { PromoArticlesMessageParser } from '../../parser/landingview/PromoArticlesMessageParser';

export class PromoArticlesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PromoArticlesMessageParser);
    }

    public getParser(): PromoArticlesMessageParser
    {
        return this.parser as PromoArticlesMessageParser;
    }
}
