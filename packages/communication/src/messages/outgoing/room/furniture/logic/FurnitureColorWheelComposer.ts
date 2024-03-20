import { IMessageComposer } from '@nitrots/api';

export class FurnitureColorWheelComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureColorWheelComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureColorWheelComposer>;

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
