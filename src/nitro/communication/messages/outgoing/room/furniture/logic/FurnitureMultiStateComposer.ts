import { IMessageComposer } from '../../../../../../../api';

export class FurnitureMultiStateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureMultiStateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureMultiStateComposer>;

    constructor(itemId: number, state: number = 0)
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
