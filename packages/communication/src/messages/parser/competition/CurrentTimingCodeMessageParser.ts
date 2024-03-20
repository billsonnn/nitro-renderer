import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class CurrentTimingCodeMessageParser implements IMessageParser
{
    private _schedulingStr: string;
    private _code: string;

    public flush(): boolean
    {
        this._schedulingStr = null;
        this._code = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._schedulingStr = wrapper.readString();
        this._code = wrapper.readString();

        return true;
    }

    public get schedulingStr(): string
    {
        return this._schedulingStr;
    }

    public get code(): string
    {
        return this._code;
    }
}
