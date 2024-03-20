import { IMessageComposer } from '@nitrots/api';

export class RentableSpaceRentMessageComposer implements IMessageComposer<ConstructorParameters<typeof RentableSpaceRentMessageComposer>>
{
    private _data: ConstructorParameters<typeof RentableSpaceRentMessageComposer>;

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
