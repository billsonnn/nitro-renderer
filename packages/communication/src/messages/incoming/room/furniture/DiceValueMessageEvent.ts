import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { DiceValueMessageParser } from '../../../parser';

export class DiceValueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DiceValueMessageParser);
    }

    public getParser(): DiceValueMessageParser
    {
        return this.parser as DiceValueMessageParser;
    }
}
