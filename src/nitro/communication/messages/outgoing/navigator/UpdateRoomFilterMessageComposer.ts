import { IMessageComposer } from '../../../../../api';

export class UpdateRoomFilterMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateRoomFilterMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateRoomFilterMessageComposer>;

    constructor(roomId: number, isAddingWord: boolean, word: string)
    {
        this._data = [roomId, isAddingWord, word];
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
