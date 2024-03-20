import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class GuideTicketCreationResultMessageParser implements IMessageParser
{
    public static readonly CREATION_RESULT_OK: number = 0;
    public static readonly CREATION_RESULT_UNABLE_TO_REPORT: number = 1;
    public static readonly CREATION_RESULT_NO_CHATLOG_FOUND: number = 2;
    public static readonly CREATION_RESULT_BULLY_ALREADY_REPORTED: number = 3;

    private _result: number;

    public flush(): boolean
    {
        this._result = 0;

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
