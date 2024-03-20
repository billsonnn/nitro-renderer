import { IMessageComposer } from '@nitrots/api';

export class RemoveOwnRoomRightsRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof RemoveOwnRoomRightsRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof RemoveOwnRoomRightsRoomMessageComposer>;

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
