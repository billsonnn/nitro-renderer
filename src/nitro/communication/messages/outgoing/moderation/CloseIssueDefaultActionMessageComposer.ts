import { IMessageComposer } from '../../../../../api';

export class CloseIssueDefaultActionMessageComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(issueId: number, issueIds: number[], topicId: number)
    {
        this._data = [issueId, issueIds.length, ...issueIds, topicId];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
