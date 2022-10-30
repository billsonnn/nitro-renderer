import { IMessageComposer } from '../../../../../api';

export class GroupConfirmRemoveMemberComposer implements IMessageComposer<ConstructorParameters<typeof GroupConfirmRemoveMemberComposer>>
{
    private _data: ConstructorParameters<typeof GroupConfirmRemoveMemberComposer>;

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
