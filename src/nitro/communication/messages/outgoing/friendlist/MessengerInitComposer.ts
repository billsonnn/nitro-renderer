import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class MessengerInitComposer implements IMessageComposer<ConstructorParameters<typeof MessengerInitComposer>>
{
    private _data: ConstructorParameters<typeof MessengerInitComposer>;

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