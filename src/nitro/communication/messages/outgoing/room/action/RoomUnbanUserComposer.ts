import { IMessageComposer } from '../../../../../../api';

export class RoomUnbanUserComposer implements IMessageComposer<ConstructorParameters<typeof RoomUnbanUserComposer>>
{
    private _data: ConstructorParameters<typeof RoomUnbanUserComposer>;

    constructor(userId: number, roomId: number)
    {
        this._data = [userId, roomId];
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
