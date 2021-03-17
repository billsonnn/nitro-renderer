import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class ModtoolRequestRoomChatlogComposer implements IMessageComposer<ConstructorParameters<typeof ModtoolRequestRoomChatlogComposer>>
{
    private _data: ConstructorParameters<typeof ModtoolRequestRoomChatlogComposer>;

    constructor(roomId: number, useless: number = 0)
    {
        this._data = [ useless, roomId ];
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
