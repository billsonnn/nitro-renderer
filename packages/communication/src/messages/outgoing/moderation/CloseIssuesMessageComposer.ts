import { IMessageComposer } from '@nitrots/api';

export class CloseIssuesMessageComposer implements IMessageComposer<number[]>
{
    public static readonly RESOLUTION_USELESS = 1;
    public static readonly RESOLUTION_ABUSIVE = 2;
    public static readonly RESOLUTION_RESOLVED = 3;

    private _data: number[];

    constructor(issueIds: number[], resolutionType: number)
    {
        this._data = [resolutionType, issueIds.length, ...issueIds];
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
