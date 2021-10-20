import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';


export class CloseIssuesMessageComposer implements IMessageComposer<number[]>
{
    private _data: number[];

    constructor(issueIds: number[], _arg_2: number)
    {
        this._data = [ _arg_2, issueIds.length, ...issueIds];
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
