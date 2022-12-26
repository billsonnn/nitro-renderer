import { IMessageComposer } from '../../../../../../api';

export class RentableSpaceStatusMessageComposer implements IMessageComposer<ConstructorParameters<typeof RentableSpaceStatusMessageComposer>>
{
    private _data: ConstructorParameters<typeof RentableSpaceStatusMessageComposer>;

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
