import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
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

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        const issueId: number = wrapper.readInt();
        const state: number = wrapper.readInt();
        const categoryId: number = wrapper.readInt();
        const reportedCategoryId: number = wrapper.readInt();
        const issueAgeInMs: number = wrapper.readInt();
        const priority: number = wrapper.readInt();
        const groupingId: number = wrapper.readInt();
        const reporterUserId: number = wrapper.readInt();
        const reporterUsername: string = wrapper.readString();
        const reportedUserId: number = wrapper.readInt();
        const reportedUsername: string = wrapper.readString();
        const pickerUserId: number = wrapper.readInt();
        const pickerUsername: string = wrapper.readString();
        const message: string = wrapper.readString();
        const chatRecordId: number = wrapper.readInt();

        const patternsCount: number = wrapper.readInt();
        const patterns: PatternMatchData[] = [];

        for(let i = 0; i < patternsCount; i++)
        {
            patterns.push(new PatternMatchData(wrapper));
        }

        this._issueData = new IssueMessageData(issueId, state, categoryId, reportedCategoryId, issueAgeInMs,
            priority, groupingId, reporterUserId, reporterUsername, reportedUserId, reportedUsername,
            pickerUserId, pickerUsername, message, chatRecordId, patterns);
        return true;
    }
}
