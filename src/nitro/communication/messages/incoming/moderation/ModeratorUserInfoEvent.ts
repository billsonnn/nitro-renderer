import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ModeratorUserInfoMessageParser } from '../../parser/moderation/ModeratorUserInfoMessageParser';

export class ModeratorUserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorUserInfoMessageParser);
    }

    public getParser(): ModeratorUserInfoMessageParser
    {
        return this.parser as ModeratorUserInfoMessageParser;
    }
}
