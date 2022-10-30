import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { DiceValueMessageParser } from '../../../parser/room/furniture/DiceValueMessageParser';

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
