import { IMessageComposer } from '@nitrots/api';

export class CallForHelpMessageComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(message: string, topicIndex: number, reportedUserId: number, reportedRoomId: number, chatEntries: (string | number)[])
    {
        this._data = [message, topicIndex, reportedUserId, reportedRoomId, chatEntries.length / 2, ...chatEntries];
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
