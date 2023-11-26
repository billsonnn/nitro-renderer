import { IMessageComposer } from '../../../../../api';

export class ModerateMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModerateMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModerateMessageMessageComposer>;

    constructor(groupId: number, threadId: number, messageId: number, forumState: number)
    {
        this._data = [groupId, threadId, messageId, forumState];
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
