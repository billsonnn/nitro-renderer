import { IMessageComposer } from '../../../../../api';

export class ModerateRoomMessageComposer implements IMessageComposer<ConstructorParameters<typeof ModerateRoomMessageComposer>>
{
    private _data: ConstructorParameters<typeof ModerateRoomMessageComposer>;

    constructor(roomId: number, lockDoor: number, changeTitle: number, kickUsers: number)
    {
        this._data = [roomId, lockDoor, changeTitle, kickUsers];
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
