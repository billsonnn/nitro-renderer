import { IMessageEvent } from '../../../../../api';
import { MessageEvent } from '../../../../../events';
import { ChangeUserNameResultMessageParser } from '../../parser';

export class ChangeUserNameResultMessageEvent extends MessageEvent implements IMessageEvent
{
    public static NAME_OK: number = 0;
    public static ERROR_NAME_REQUIRED: number = 1;
    public static ERROR_NAME_TOO_SHORT: number = 2;
    public static ERROR_NAME_TOO_LONG: number = 3;
    public static ERROR_NAME_NOT_VALID: number = 4;
    public static ERROR_NAME_IN_USE: number = 5;
    public static ERROR_NAME_CHANGE_NOT_ALLOWED: number = 6;
    public static ERROR_MERGE_HOTEL_DOWN: number = 7;

    constructor(callBack: Function)
    {
        super(callBack, ChangeUserNameResultMessageParser);
    }

    public getParser(): ChangeUserNameResultMessageParser
    {
        return this.parser as ChangeUserNameResultMessageParser;
    }
}
