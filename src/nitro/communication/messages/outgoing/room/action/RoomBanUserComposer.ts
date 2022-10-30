import { IMessageComposer } from '../../../../../../api';

export class RoomBanUserComposer implements IMessageComposer<ConstructorParameters<typeof RoomBanUserComposer>>
{
    private _data: ConstructorParameters<typeof RoomBanUserComposer>;

    constructor(userId: number, roomId: number = 0, type: string)
    {
        this._data = [userId, roomId, type];
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
