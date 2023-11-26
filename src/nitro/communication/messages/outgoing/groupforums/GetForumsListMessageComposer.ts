import { IMessageComposer } from '../../../../../api';

export class GetForumsListMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetForumsListMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetForumsListMessageComposer>;

    constructor(groupId: number, startIndex: number, pageSize: number)
    {
        this._data = [groupId, startIndex, pageSize];
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
