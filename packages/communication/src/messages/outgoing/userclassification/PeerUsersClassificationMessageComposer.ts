import { IMessageComposer } from '@nitrots/api';

export class PeerUsersClassificationMessageComposer implements IMessageComposer<ConstructorParameters<typeof PeerUsersClassificationMessageComposer>>
{
    private _data: ConstructorParameters<typeof PeerUsersClassificationMessageComposer>;

    constructor(userClassType: string)
    {
        this._data = [userClassType];
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
