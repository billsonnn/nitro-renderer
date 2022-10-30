import { IMessageComposer } from '../../../../../../../api';

export class RoomUnitChatWhisperComposer implements IMessageComposer<[string, number]>
{
    private _data: [string, number];

    constructor(recipientName: string, message: string, styleId: number)
    {
        this._data = [(recipientName + ' ' + message), styleId];
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
