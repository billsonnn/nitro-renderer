import { IMessageComposer } from '@nitrots/api';

export class GetModeratorRoomInfoMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetModeratorRoomInfoMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetModeratorRoomInfoMessageComposer>;

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
