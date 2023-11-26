import { IMessageComposer } from '../../../../../api';

export class RoomAdEventTabAdClickedComposer implements IMessageComposer<ConstructorParameters<typeof RoomAdEventTabAdClickedComposer>>
{
    private _data: ConstructorParameters<typeof RoomAdEventTabAdClickedComposer>;

    constructor(flatId: number, roomAdName: string, roomAdExpiresInMin: number)
    {
        this._data = [flatId, roomAdName, roomAdExpiresInMin];
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
