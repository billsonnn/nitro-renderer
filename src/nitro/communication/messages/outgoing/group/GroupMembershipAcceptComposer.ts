import { IMessageComposer } from '../../../../../api';

export class GroupMembershipAcceptComposer implements IMessageComposer<ConstructorParameters<typeof GroupMembershipAcceptComposer>>
{
    private _data: ConstructorParameters<typeof GroupMembershipAcceptComposer>;

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
