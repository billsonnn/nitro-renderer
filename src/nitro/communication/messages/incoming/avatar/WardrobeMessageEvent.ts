import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { WardrobeMessageParser } from '../../parser';

export class WardrobeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WardrobeMessageParser);
    }

    public getParser(): WardrobeMessageParser
    {
        return this.parser as WardrobeMessageParser;
    }
}
