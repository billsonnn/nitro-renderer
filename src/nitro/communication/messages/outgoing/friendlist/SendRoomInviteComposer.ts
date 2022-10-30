import { IMessageComposer } from '../../../../../api';

export class SendRoomInviteComposer implements IMessageComposer<any>
{
    private _data: any;

    constructor(message: string, userIds: number[])
    {
        this._data = [userIds.length, ...userIds, message];
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
