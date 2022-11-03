import { IMessageEvent } from '../../../../../../api';
import { MessageEvent } from '../../../../../../events';
import { _Str_9021 } from '../../../parser';

export class _Str_17532 extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, _Str_9021);
    }

    public getParser(): _Str_9021
    {
        return this.parser as _Str_9021;
    }
}
