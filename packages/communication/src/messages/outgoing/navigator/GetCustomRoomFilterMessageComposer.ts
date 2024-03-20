import { IMessageComposer } from '@nitrots/api';

export class GetCustomRoomFilterMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCustomRoomFilterMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCustomRoomFilterMessageComposer>;

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
