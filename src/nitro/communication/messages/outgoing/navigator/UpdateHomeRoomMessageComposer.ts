import { IMessageComposer } from '../../../../../api';

export class UpdateHomeRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof UpdateHomeRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof UpdateHomeRoomMessageComposer>;

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
