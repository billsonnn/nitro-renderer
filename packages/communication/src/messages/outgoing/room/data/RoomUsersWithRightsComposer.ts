import { IMessageComposer } from '@nitrots/api';

export class RoomUsersWithRightsComposer implements IMessageComposer<ConstructorParameters<typeof RoomUsersWithRightsComposer>>
{
    private _data: ConstructorParameters<typeof RoomUsersWithRightsComposer>;

    constructor(roomId: number)
    {
        this._data = [roomId];
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
