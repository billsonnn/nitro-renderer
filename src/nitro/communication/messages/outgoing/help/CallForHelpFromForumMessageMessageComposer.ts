import { IMessageComposer } from '../../../../../api';

export class CallForHelpFromForumMessageMessageComposer implements IMessageComposer<ConstructorParameters<typeof CallForHelpFromForumMessageMessageComposer>>
{
    private _data: ConstructorParameters<typeof CallForHelpFromForumMessageMessageComposer>;

    constructor(groupId: number, threadId: number, messageId: number, topicId: number, message: string)
    {
        this._data = [groupId, threadId, messageId, topicId, message];
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
