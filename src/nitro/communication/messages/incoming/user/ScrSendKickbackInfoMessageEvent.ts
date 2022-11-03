import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ScrSendKickbackInfoMessageParser } from '../../parser';

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
