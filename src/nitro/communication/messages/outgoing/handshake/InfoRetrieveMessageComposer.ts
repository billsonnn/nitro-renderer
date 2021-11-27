import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class InfoRetrieveMessageComposer implements IMessageComposer<ConstructorParameters<typeof InfoRetrieveMessageComposer>>
{
    private _data: ConstructorParameters<typeof InfoRetrieveMessageComposer>;

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
