import { IMessageEvent } from '../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../core/communication/messages/MessageEvent';
import { ChangeNameUpdateParser } from '../../parser/avatar/ChangeNameUpdateParser';

export class ChangeNameUpdateEvent extends MessageEvent implements IMessageEvent
{
    public static _Str_5797: number     = 0;
    public static _Str_7005: number     = 1;
    public static _Str_7389: number     = 2;
    public static _Str_7137: number     = 3;
    public static _Str_7836: number     = 4;
    public static _Str_7721: number     = 5;
    public static _Str_8620: number     = 6;
    public static  _Str_9429: number    = 7;

    constructor(callBack: Function)
    {
        super(callBack, ChangeNameUpdateParser);
    }

    public getParser(): ChangeNameUpdateParser
    {
        return this.parser as ChangeNameUpdateParser;
    }
}