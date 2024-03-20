import { IMessageComposer } from '@nitrots/api';

export class GetGuestRoomMessageComposer implements IMessageComposer<[number, number, number]>
{
    private _data: [number, number, number];

    constructor(roomId: number, enterRoom: boolean, forwardRoom: boolean)
    {
        this._data = [roomId, (enterRoom ? 1 : 0), (forwardRoom ? 1 : 0)];
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
