import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { _Str_7305 } from '../../../parser/inventory/badges/_Str_7305';

export class _Str_8980 extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, _Str_7305);
    }

    public getParser(): _Str_7305
    {
        return this.parser as _Str_7305;
    }
}