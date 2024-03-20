import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { Game2UserLeftGameMessageParser } from '../../../parser';

export class Game2UserLeftGameMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, Game2UserLeftGameMessageParser);
    }

    public getParser(): Game2UserLeftGameMessageParser
    {
        return this.parser as Game2UserLeftGameMessageParser;
    }
}
