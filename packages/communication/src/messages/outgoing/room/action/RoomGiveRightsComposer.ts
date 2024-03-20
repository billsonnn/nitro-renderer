import { IMessageComposer } from '@nitrots/api';

export class RoomGiveRightsComposer implements IMessageComposer<ConstructorParameters<typeof RoomGiveRightsComposer>>
{
    private _data: ConstructorParameters<typeof RoomGiveRightsComposer>;

    constructor(userId: number)
    {
        this._data = [userId];
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
