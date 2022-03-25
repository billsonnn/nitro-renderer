import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class SendRoomInviteComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(userIds: number[], message: string)
    {
        this._data = [ userIds.length, ...userIds, message ];
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
