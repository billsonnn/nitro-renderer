import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { GameInviteMessageParser } from '../../../parser';

export class GameInviteMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GameInviteMessageParser);
    }

    public getParser(): GameInviteMessageParser
    {
        return this.parser as GameInviteMessageParser;
    }
}
