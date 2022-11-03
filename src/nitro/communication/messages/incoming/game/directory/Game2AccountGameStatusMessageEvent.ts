import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../core';
import { Game2AccountGameStatusMessageParser } from '../../../parser/game/directory';

export class Game2AccountGameStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, Game2AccountGameStatusMessageParser);
    }

    public getParser(): Game2AccountGameStatusMessageParser
    {
        return this.parser as Game2AccountGameStatusMessageParser;
    }
}
