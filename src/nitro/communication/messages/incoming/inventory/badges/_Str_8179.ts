import { IMessageEvent } from '../../../../../../core/communication/messages/IMessageEvent';
import { MessageEvent } from '../../../../../../core/communication/messages/MessageEvent';
import { _Str_9135 } from '../../../parser/inventory/badges/_Str_9135';

export class _Str_8179 extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, _Str_9135);
    }

    public getParser(): _Str_9135
    {
        return this.parser as _Str_9135;
    }
}