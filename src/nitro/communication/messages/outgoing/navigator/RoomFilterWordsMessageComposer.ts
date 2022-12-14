import { IMessageComposer } from '../../../../../api';

export class RoomFilterWordsMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomFilterWordsMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomFilterWordsMessageComposer>;

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
