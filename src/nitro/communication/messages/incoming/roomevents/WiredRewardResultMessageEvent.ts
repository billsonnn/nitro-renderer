import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { WiredRewardResultMessageParser } from '../../parser/roomevents/WiredRewardResultMessageParser';

export class WiredRewardResultMessageEvent extends MessageEvent implements IMessageEvent
{
    public static _Str_18436: number    = 6;
    public static _Str_17787: number    = 7;

    constructor(callBack: Function)
    {
        super(callBack, WiredRewardResultMessageParser);
    }

    public getParser(): WiredRewardResultMessageParser
    {
        return this.parser as WiredRewardResultMessageParser;
    }
}