import { IMessageComposer } from '../../../../../api';

export class ModerateThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModerateThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModerateThreadMessageComposer>;

    constructor(groupId: number, threadId: number, forumState: number)
    {
        this._data = [groupId, threadId, forumState];
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
