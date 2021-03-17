import { IMessageComposer } from '../../../../../core/communication/messages/IMessageComposer';

export class RoomMuteComposer implements IMessageComposer<unknown[]>
{
    private _data: unknown[];

    constructor()
    {
        this._data = [ ];
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