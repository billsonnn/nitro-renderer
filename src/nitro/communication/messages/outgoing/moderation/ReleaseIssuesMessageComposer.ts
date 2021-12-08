import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ReleaseIssuesMessageComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(issueIds: number[])
    {
        this._data = [issueIds.length, ...issueIds];
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
