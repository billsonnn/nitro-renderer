import { IMessageComposer } from '@nitrots/api';

export class ApproveAllMembershipRequestsMessageComposer implements IMessageComposer<ConstructorParameters<typeof ApproveAllMembershipRequestsMessageComposer>>
{
    private _data: ConstructorParameters<typeof ApproveAllMembershipRequestsMessageComposer>;

    constructor(groupId: number)
    {
        this._data = [groupId];
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
