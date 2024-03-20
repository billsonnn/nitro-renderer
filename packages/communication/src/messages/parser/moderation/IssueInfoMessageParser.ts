import { IMessageDataWrapper, IMessageParser } from '@nitrots/api';
import { IssueMessageData } from './IssueMessageData';
import { PatternMatchData } from './PatternMatchData';

export class IssueInfoMessageParser implements IMessageParser
{
    private _issueData: IssueMessageData;


    public get issueData(): IssueMessageData
    {
        return this._issueData;
    }

    public flush(): boolean
    {
        this._issueData = null;
        return true;
    }

    public parse(k: IMessageDataWrapper): boolean
    {
        const issueId: number = k.readInt();
        const state: number = k.readInt();
        const categoryId: number = k.readInt();
        const reportedCategoryId: number = k.readInt();
        const issueAgeInMs: number = k.readInt();
        const priority: number = k.readInt();
        const groupingId: number = k.readInt();
        const reporterUserId: number = k.readInt();
        const reporterUsername: string = k.readString();
        const reportedUserId: number = k.readInt();
        const reportedUsername: string = k.readString();
        const pickerUserId: number = k.readInt();
        const pickerUsername: string = k.readString();
        const message: string = k.readString();
        const chatRecordId: number = k.readInt();

        const patternsCount: number = k.readInt();
        const patterns: PatternMatchData[] = [];

        for(let i = 0; i < patternsCount; i++)
        {
            patterns.push(new PatternMatchData(k));
        }

        this._issueData = new IssueMessageData(issueId, state, categoryId, reportedCategoryId, issueAgeInMs,
            priority, groupingId, reporterUserId, reporterUsername, reportedUserId, reportedUsername,
            pickerUserId, pickerUsername, message, chatRecordId, patterns);
        return true;
    }
}
