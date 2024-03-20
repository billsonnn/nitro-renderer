import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class AccountSafetyLockStatusChangeParser implements IMessageParser
{
    public static SAFETY_LOCK_STATUS_LOCKED: number = 0;
    public static SAFETY_LOCK_STATUS_UNLOCKED: number = 1;

    private _status: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._status = wrapper.readInt();

        return true;
    }

    public get status(): number
    {
        return this._status;
    }
}
