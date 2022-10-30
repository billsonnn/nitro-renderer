import { IMessageComposer } from '../../../../../api';

export class CloseIssueDefaultActionMessageComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(k: number, issueIds: number[], _arg_2: number)
    {
        this._data = [k, issueIds.length, ...issueIds, _arg_2];
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
