import { IMessageComposer } from '../../../../../api';

export class UpdateForumSettingsMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateForumSettingsMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateForumSettingsMessageComposer>;

    constructor(groupId: number, canRead: number, postMessages: number, postThreads: number, modForum: number)
    {
        this._data = [groupId, canRead, postMessages, postThreads, modForum];
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
