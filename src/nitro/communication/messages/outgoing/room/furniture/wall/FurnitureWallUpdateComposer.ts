import { IMessageComposer } from '../../../../../../../core/communication/messages/IMessageComposer';

export class FurnitureWallUpdateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureWallUpdateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureWallUpdateComposer>;

    constructor(itemId: number, location: string)
    {
        this._data = [ itemId, location ];
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