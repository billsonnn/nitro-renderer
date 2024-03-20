import { IMessageComposer } from '@nitrots/api';

export class RoomKickUserComposer implements IMessageComposer<ConstructorParameters<typeof RoomKickUserComposer>>
{
    private _data: ConstructorParameters<typeof RoomKickUserComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
