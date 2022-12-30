import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { BotForceOpenContextMenuParser } from '../../../parser';

export class BotForceOpenContextMenuEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotForceOpenContextMenuParser);
    }

    public getParser(): BotForceOpenContextMenuParser
    {
        return this.parser as BotForceOpenContextMenuParser;
    }
}
