import { IMessageComposer } from '@nitrots/api';

export class FriendFurniConfirmLockMessageComposer implements IMessageComposer<ConstructorParameters<typeof FriendFurniConfirmLockMessageComposer>>
{
    private _data: ConstructorParameters<typeof FriendFurniConfirmLockMessageComposer>;

    constructor(itemId: number, confirmed: boolean)
    {
        this._data = [itemId, confirmed];
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
