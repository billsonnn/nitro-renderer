import { IMessageEvent, MessageEvent } from '../../../../../../core';
import { FigureSetIdsMessageParser } from '../../../parser/inventory/clothing/FigureSetIdsMessageParser';

export class FigureSetIdsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FigureSetIdsMessageParser);
    }

    public getParser(): FigureSetIdsMessageParser
    {
        return this.parser as FigureSetIdsMessageParser;
    }
}
