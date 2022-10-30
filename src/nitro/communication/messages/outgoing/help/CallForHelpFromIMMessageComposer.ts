import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromIMMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(message: string, topicId: number, reportedUserId: number, chatEntries: (string | number)[])
    {
        this._data = [message, topicId, reportedUserId, chatEntries.length / 2, ...chatEntries];
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
