import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class FurniturePickupComposer implements IMessageComposer<ConstructorParameters<typeof FurniturePickupComposer>>
{
    private _data: ConstructorParameters<typeof FurniturePickupComposer>;

    constructor(category: number, objectId: number)
    {
        this._data = [ category, objectId ];
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