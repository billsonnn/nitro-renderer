import { IMessageComposer } from '../../../../../api';

export class SetRoomSessionTagsMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetRoomSessionTagsMessageComposer>>
{
    private _data: ConstructorParameters<typeof SetRoomSessionTagsMessageComposer>;

    constructor(tag1: string, tag2: string)
    {
        this._data = [tag1, tag2];
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
