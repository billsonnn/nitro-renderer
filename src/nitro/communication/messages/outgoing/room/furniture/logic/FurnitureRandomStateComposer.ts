import { IMessageComposer } from '../../../../../../../api';

export class FurnitureRandomStateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureRandomStateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureRandomStateComposer>;

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
