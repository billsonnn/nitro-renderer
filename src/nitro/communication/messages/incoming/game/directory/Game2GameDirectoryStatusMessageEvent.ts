import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { Game2GameDirectoryStatusMessageParser } from '../../../parser';

export class Game2GameDirectoryStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, Game2GameDirectoryStatusMessageParser);
    }

    public getParser(): Game2GameDirectoryStatusMessageParser
    {
        return this.parser as Game2GameDirectoryStatusMessageParser;
    }
}
