import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { FigureUpdateParser } from '../../parser';

export class FigureUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FigureUpdateParser);
    }

    public getParser(): FigureUpdateParser
    {
        return this.parser as FigureUpdateParser;
    }
}
