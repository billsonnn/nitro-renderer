import { IMessageComposer } from '../../../../../../api';

export class RemoveWallItemComposer implements IMessageComposer<ConstructorParameters<typeof RemoveWallItemComposer>>
{
    private _data: ConstructorParameters<typeof RemoveWallItemComposer>;

    constructor(itemId: number)
    {
        this._data = [itemId];
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
