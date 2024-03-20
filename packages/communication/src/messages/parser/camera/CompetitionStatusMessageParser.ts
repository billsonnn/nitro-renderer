import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CompetitionStatusMessageParser implements IMessageParser
{
    private _ok: boolean = false;
    private _errorReason: string = null;

    public flush(): boolean
    {
        this._ok = false;
        this._errorReason = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._ok = wrapper.readBoolean();
        this._errorReason = wrapper.readString();

        return true;
    }

    public get ok(): boolean
    {
        return this._ok;
    }

    public get errorReason(): string
    {
        return this._errorReason;
    }
}
