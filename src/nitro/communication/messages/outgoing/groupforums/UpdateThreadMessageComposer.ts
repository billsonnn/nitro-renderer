import { IMessageComposer } from '../../../../../api';

export class UpdateThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateThreadMessageComposer>;

    constructor(groupId: number, threadId: number, isLocked: boolean, isPinned: boolean)
    {
        this._data = [groupId, threadId, isPinned, isLocked];
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
