import { IMessageComposer } from '@nitrots/api';

export class UnblockGroupMemberMessageComposer implements IMessageComposer<ConstructorParameters<typeof UnblockGroupMemberMessageComposer>>
{
    private _data: ConstructorParameters<typeof UnblockGroupMemberMessageComposer>;

    constructor(groupId: number, userId: number)
    {
        this._data = [groupId, userId];
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
