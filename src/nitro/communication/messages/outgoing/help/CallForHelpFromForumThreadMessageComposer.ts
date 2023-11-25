import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromForumThreadMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromForumThreadMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromForumThreadMessageComposer>;

    constructor(groupId: number, threadId: number, cfhTopic: number, message: string)
    {
        this._data = [groupId, threadId, cfhTopic, message];
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
