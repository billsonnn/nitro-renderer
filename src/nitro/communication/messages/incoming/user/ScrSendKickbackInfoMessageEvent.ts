import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../core';
import { ScrSendKickbackInfoMessageParser } from '../../parser/user/ScrSendKickbackInfoMessageParser';

export class ScrSendKickbackInfoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ScrSendKickbackInfoMessageParser);
    }

    public getParser(): ScrSendKickbackInfoMessageParser
    {
        return this.parser as ScrSendKickbackInfoMessageParser;
    }
}
