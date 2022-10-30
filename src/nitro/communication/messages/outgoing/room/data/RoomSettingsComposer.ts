import { IMessageComposer } from '../../../../../../api';

export class RoomSettingsComposer implements IMessageComposer<[number]>
{
    private _data: [number];

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
