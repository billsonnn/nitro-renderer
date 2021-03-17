import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ClientPongComposer implements IMessageComposer<ConstructorParameters<typeof ClientPongComposer>>
{
    private _data: ConstructorParameters<typeof ClientPongComposer>;

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