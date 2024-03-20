import { IMessageComposer } from '@nitrots/api';

export class GroupAdminTakeComposer implements IMessageComposer<ConstructorParameters<typeof GroupAdminTakeComposer>>
{
    private _data: ConstructorParameters<typeof GroupAdminTakeComposer>;

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
