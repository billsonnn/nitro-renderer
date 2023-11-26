import { IMessageComposer } from '../../../../../api';

export class UpdateForumReadMarkerMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(...data: UpdateForumReadMarkerEntry[])
    {
        this._data = [data.length];
        data.forEach(entry =>
        {
            this._data.push(entry.groupId);
            this._data.push(entry.lastReadMessageId);
            this._data.push(entry.isLastReadMessageId);
        });
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

export class UpdateForumReadMarkerEntry
{
    constructor(public groupId: number, public lastReadMessageId: number, public isLastReadMessageId: boolean)
    { }
}
