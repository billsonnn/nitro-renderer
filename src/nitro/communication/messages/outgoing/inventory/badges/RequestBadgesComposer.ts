import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class RequestBadgesComposer implements IMessageComposer<ConstructorParameters<typeof RequestBadgesComposer>>
{
    private _data: ConstructorParameters<typeof RequestBadgesComposer>;

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
