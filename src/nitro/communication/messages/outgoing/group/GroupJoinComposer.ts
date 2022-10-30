import { IMessageComposer } from '../../../../../api';

export class GroupJoinComposer implements IMessageComposer<ConstructorParameters<typeof GroupJoinComposer>>
{
    private _data: ConstructorParameters<typeof GroupJoinComposer>;

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
