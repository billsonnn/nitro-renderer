import { IMessageComposer } from '../../../../../../api';

export class ExtendRentOrBuyoutStripItemMessageComposer implements IMessageComposer<ConstructorParameters<typeof ExtendRentOrBuyoutStripItemMessageComposer>>
{
    private _data: ConstructorParameters<typeof ExtendRentOrBuyoutStripItemMessageComposer>;

    constructor(stripId: number, isBuyout: boolean)
    {
        this._data = [stripId, isBuyout];
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
