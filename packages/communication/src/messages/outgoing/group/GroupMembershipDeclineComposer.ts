import { IMessageComposer } from '@nitrots/api';

export class GroupMembershipDeclineComposer implements IMessageComposer<ConstructorParameters<typeof GroupMembershipDeclineComposer>>
{
    private _data: ConstructorParameters<typeof GroupMembershipDeclineComposer>;

    constructor(groupId: number, memberId: number)
    {
        this._data = [groupId, memberId];
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
