import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { FigureSetIdsMessageParser } from '../../../parser';

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
