import { IMessageComposer } from '../../../../../../api';

export class RoomEnterComposer implements IMessageComposer<ConstructorParameters<typeof RoomEnterComposer>>
{
    private _data: ConstructorParameters<typeof RoomEnterComposer>;

    constructor(roomId: number, password: string = null)
    {
        this._data = [roomId, password];
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
