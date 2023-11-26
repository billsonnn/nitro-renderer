import { IMessageComposer } from '../../../../../api';

export class GetMessagesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetMessagesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetMessagesMessageComposer>;

    constructor(groupId: number, threadId: number, startIndex: number, pageSize: number)
    {
        this._data = [groupId, threadId, startIndex, pageSize];
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
