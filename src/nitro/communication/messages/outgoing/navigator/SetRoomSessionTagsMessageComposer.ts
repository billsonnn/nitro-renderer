import { IMessageComposer } from '../../../../../api';

export class SetRoomSessionTagsMessageComposer implements IMessageComposer<ConstructorParameters<typeof SetRoomSessionTagsMessageComposer>>
{
    private _data: ConstructorParameters<typeof SetRoomSessionTagsMessageComposer>;

    constructor(k: string, _arg_2: string)
    {
        this._data = [k, _arg_2];
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
