import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RequestSellItemComposer implements IMessageComposer<ConstructorParameters<typeof RequestSellItemComposer>>
{
    private _data: ConstructorParameters<typeof RequestSellItemComposer>;

    constructor()
    {
        this._data = [];
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
