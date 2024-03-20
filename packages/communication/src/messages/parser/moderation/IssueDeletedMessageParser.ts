import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';

export class IssueDeletedMessageParser implements IMessageParser
{
    private _issueId: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        this._issueId = parseInt(k.readString());
        return true;
    }

    public get issueId(): number
    {
        return this._issueId;
    }
}
