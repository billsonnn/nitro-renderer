import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RequestPetsComposer implements IMessageComposer<ConstructorParameters<typeof RequestPetsComposer>>
{
    private _data: ConstructorParameters<typeof RequestPetsComposer>;

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
