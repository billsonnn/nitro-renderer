import { IMessageDataWrapper, IMessageParser } from '../../../../../api';

export class IssueDeletedMessageParser implements IMessageParser
{
    private _issueId: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._issueId = parseInt(wrapper.readString());
        return true;
    }

    public get issueId(): number
    {
        return this._issueId;
    }
}
