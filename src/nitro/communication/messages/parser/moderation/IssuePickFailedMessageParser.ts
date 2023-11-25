import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { IssueMessageData } from './IssueMessageData';

export class IssuePickFailedMessageParser implements IMessageParser
{
    private _issues: IssueMessageData[];
    private _retryEnabled: boolean;
    private _retryCount: number;

    public flush(): boolean
    {
        this._issues = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._issues = [];

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            const issueId = wrapper.readInt();
            const userId = wrapper.readInt();
            const userName = wrapper.readString();
            const _local_7 = new IssueMessageData(issueId, 0, 0, 0, 0, 0, 0, 0, null, 0, null, userId, userName, null, 0, []);
            this._issues.push(_local_7);
        }

        this._retryEnabled = wrapper.readBoolean();
        this._retryCount = wrapper.readInt();
        return true;
    }

    public get issues(): IssueMessageData[]
    {
        return this._issues;
    }

    public get retryEnabled(): boolean
    {
        return this._retryEnabled;
    }

    public get retryCount(): number
    {
        return this._retryCount;
    }
}
