import { IMessageComposer } from '../../../../../api';

export class RoomAdEventTabAdClickedComposer implements IMessageComposer<ConstructorParameters<typeof RoomAdEventTabAdClickedComposer>>
{
    private _data: ConstructorParameters<typeof RoomAdEventTabAdClickedComposer>;

    constructor(k: number, _arg_2: string, _arg_3: number)
    {
        this._data = [k, _arg_2, _arg_3];
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
