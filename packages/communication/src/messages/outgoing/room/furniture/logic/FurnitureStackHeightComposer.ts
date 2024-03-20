import { IMessageComposer } from '@nitrots/api';

export class FurnitureStackHeightComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureStackHeightComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureStackHeightComposer>;

    constructor(itemId: number, height: number = -100)
    {
        this._data = [itemId, height];
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
