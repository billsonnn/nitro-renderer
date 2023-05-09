import { IMessageComposer } from '../../../../../api';

export class RoomNetworkOpenConnectionMessageComposer implements IMessageComposer<ConstructorParameters<typeof RoomNetworkOpenConnectionMessageComposer>>
{
    private _data: ConstructorParameters<typeof RoomNetworkOpenConnectionMessageComposer>;

    constructor(k: number, _arg_2: number)
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
