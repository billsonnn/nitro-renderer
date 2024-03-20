import { IMessageComposer } from '@nitrots/api';

export class RentableSpaceCancelRentMessageComposer implements IMessageComposer<ConstructorParameters<typeof RentableSpaceCancelRentMessageComposer>>
{
    private _data: ConstructorParameters<typeof RentableSpaceCancelRentMessageComposer>;

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
