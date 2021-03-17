import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class RedeemItemClothingComposer implements IMessageComposer<ConstructorParameters<typeof RedeemItemClothingComposer>>
{
    private _data: ConstructorParameters<typeof RedeemItemClothingComposer>;

    constructor(setId: number)
    {
        this._data = [ setId ];
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