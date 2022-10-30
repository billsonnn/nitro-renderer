import { IMessageComposer } from '../../../../../../../api';

export class FurnitureOneWayDoorComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureOneWayDoorComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureOneWayDoorComposer>;

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
