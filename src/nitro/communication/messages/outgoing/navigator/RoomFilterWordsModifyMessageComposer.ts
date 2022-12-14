import { IMessageComposer } from '../../../../../api';

export class RoomFilterWordsModifyMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomFilterWordsModifyMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomFilterWordsModifyMessageComposer>;

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
