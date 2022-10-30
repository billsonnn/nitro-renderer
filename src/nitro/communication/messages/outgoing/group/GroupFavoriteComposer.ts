import { IMessageComposer } from '../../../../../api';

export class GroupFavoriteComposer implements IMessageComposer<ConstructorParameters<typeof GroupFavoriteComposer>>
{
    private _data: ConstructorParameters<typeof GroupFavoriteComposer>;

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
