import { IMessageComposer } from '@nitrots/api';

export class GroupMembersComposer implements IMessageComposer<ConstructorParameters<typeof GroupMembersComposer>>
{
    private _data: ConstructorParameters<typeof GroupMembersComposer>;

    constructor(groupId: number, pageId: number, query: string, levelId: number)
    {
        this._data = [groupId, pageId, query, levelId];
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
