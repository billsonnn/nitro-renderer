import { IMessageComposer } from '@nitrots/api';

export class GetRoomChatlogMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetRoomChatlogMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetRoomChatlogMessageComposer>;

    constructor(roomId: number, useless: number = 0)
    {
        this._data = [useless, roomId];
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
