import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserWardrobePageComposer implements IMessageComposer<ConstructorParameters<typeof UserWardrobePageComposer>>
{
    private _data: ConstructorParameters<typeof UserWardrobePageComposer>;

    constructor(pageId: number = 0)
    {
        this._data = [ pageId ];
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
