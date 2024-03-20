import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { _Str_8728 } from '../../../parser';

export class _Str_16135 extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, _Str_8728);
    }

    public getParser(): _Str_8728
    {
        return this.parser as _Str_8728;
    }
}
