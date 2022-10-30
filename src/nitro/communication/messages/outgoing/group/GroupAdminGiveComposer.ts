import { IMessageComposer } from '../../../../../api';

export class GroupAdminGiveComposer implements IMessageComposer<ConstructorParameters<typeof GroupAdminGiveComposer>>
{
    private _data: ConstructorParameters<typeof GroupAdminGiveComposer>;

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
