import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class InfoRetrieveBaseMessageComposer implements IMessageComposer<ConstructorParameters<typeof InfoRetrieveBaseMessageComposer>>
{
    private _data: ConstructorParameters<typeof InfoRetrieveBaseMessageComposer>;

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