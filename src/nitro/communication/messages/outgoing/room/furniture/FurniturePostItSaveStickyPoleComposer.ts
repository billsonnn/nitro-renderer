import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class FurniturePostItSaveStickyPoleComposer implements IMessageComposer<ConstructorParameters<typeof FurniturePostItSaveStickyPoleComposer>>
{
    private _data: ConstructorParameters<typeof FurniturePostItSaveStickyPoleComposer>;

    constructor(itemId: number, wallLocation: string, color: string, text: string)
    {
        this._data = [ itemId, wallLocation, color, text ];
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
