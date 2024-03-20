import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { DisconnectReasonParser } from '../../parser';
import { DisconnectReasonEnum } from './DisconnectReasonEnum';

export class DisconnectReasonEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DisconnectReasonParser);
    }

    public getParser(): DisconnectReasonParser
    {
        return this.parser as DisconnectReasonParser;
    }

    public get reasonString(): string
    {
        switch(this.getParser().reason)
        {
            case DisconnectReasonEnum.JUST_BANNED:
            case DisconnectReasonEnum.STILL_BANNED:
                return 'banned';
            case DisconnectReasonEnum.CONCURRENT_LOGIN:
                return 'concurrentlogin';
            case DisconnectReasonEnum.INCORRECT_PASSWORD:
                return 'incorrectpassword';
            default:
                return 'logout';
        }
    }
}
