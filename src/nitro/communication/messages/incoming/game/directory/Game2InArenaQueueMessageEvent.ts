import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { Game2InArenaQueueMessageParser } from '../../../parser';

export class Game2InArenaQueueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, Game2InArenaQueueMessageParser);
    }

    public getParser(): Game2InArenaQueueMessageParser
    {
        return this.parser as Game2InArenaQueueMessageParser;
    }
}
