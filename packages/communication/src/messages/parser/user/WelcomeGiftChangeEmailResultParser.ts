import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class WelcomeGiftChangeEmailResultParser implements IMessageParser
{
    private _result: number;

    public flush(): boolean
    {
        this._result = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._result = wrapper.readInt();

        return true;
    }

    public get result(): number
    {
        return this._result;
    }
}
