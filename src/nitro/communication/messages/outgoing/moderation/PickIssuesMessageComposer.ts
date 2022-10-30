import { IMessageComposer } from '../../../../../api';

export class PickIssuesMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(issueIds: number[], retryEnabled: boolean, retryCount: number, message: string)
    {
        this._data = [issueIds.length, ...issueIds, retryEnabled, retryCount, message];
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
