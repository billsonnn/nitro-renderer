import { IMessageComposer } from '@nitrots/api';

export class GroupUnfavoriteComposer implements IMessageComposer<ConstructorParameters<typeof GroupUnfavoriteComposer>>
{
    private _data: ConstructorParameters<typeof GroupUnfavoriteComposer>;

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
