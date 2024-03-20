import { IMessageEvent } from '@nitrots/api';
import { MessageEvent } from '@nitrots/events';
import { RecyclerStatusMessageParser } from '../../parser';

export class RecyclerStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    public static readonly SYSTEM_STATUS_ENABLED: number = 1;
    public static readonly SYSTEM_STATUS_DISABLED: number = 2;
    public static readonly SYSTEM_STATUS_TIMEOUT: number = 3;

    constructor(callBack: Function)
    {
        super(callBack, RecyclerStatusMessageParser);
    }

    public getParser(): RecyclerStatusMessageParser
    {
        return this.parser as RecyclerStatusMessageParser;
    }
}
