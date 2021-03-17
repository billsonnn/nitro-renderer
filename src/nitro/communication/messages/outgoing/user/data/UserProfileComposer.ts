import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class UserProfileComposer implements IMessageComposer<ConstructorParameters<typeof UserProfileComposer>>
{
    private _data: ConstructorParameters<typeof UserProfileComposer>;

    constructor(userId: number)
    {
        this._data = [ userId ];
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