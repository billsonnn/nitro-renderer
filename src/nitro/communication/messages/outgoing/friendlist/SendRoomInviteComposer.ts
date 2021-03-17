import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class SendRoomInviteComposer implements IMessageComposer<ConstructorParameters<typeof SendRoomInviteComposer>>
{
    private _data: ConstructorParameters<typeof SendRoomInviteComposer>;

    constructor(message: string, ...userIds: number[])
    {
        this._data = [ message, userIds.length, ...userIds ];
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