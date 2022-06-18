import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class GetUserEventCatsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetUserEventCatsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetUserEventCatsMessageComposer>;

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
