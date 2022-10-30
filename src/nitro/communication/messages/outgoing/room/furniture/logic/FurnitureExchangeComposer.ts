import { IMessageComposer } from '../../../../../../../api';

export class FurnitureExchangeComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureExchangeComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureExchangeComposer>;

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
