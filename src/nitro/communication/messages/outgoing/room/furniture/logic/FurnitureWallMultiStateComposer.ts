import { IMessageComposer } from '../../../../../../../api';

export class FurnitureWallMultiStateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureWallMultiStateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureWallMultiStateComposer>;

    constructor(itemId: number, state: number)
    {
        this._data = [itemId, state];
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
