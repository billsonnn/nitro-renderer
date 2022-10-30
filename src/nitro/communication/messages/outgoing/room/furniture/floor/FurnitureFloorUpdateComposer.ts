import { IMessageComposer } from '../../../../../../../api';

export class FurnitureFloorUpdateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureFloorUpdateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureFloorUpdateComposer>;

    constructor(itemId: number, x: number, y: number, direction: number)
    {
        this._data = [itemId, x, y, direction];
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
