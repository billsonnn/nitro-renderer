import { IMessageDataWrapper } from '../../../../../api';

export class RoomVisitData
{
    private _roomId: number;
    private _roomName: string;
    private _enterHour: number;
    private _enterMinute: number;

    constructor(k: IMessageDataWrapper)
    {
        this._roomId = k.readInt();
        this._roomName = k.readString();
        this._enterHour = k.readInt();
        this._enterMinute = k.readInt();
    }

    public get roomId(): number
    {
        return this._roomId;
    }

    public get roomName(): string
    {
        return this._roomName;
    }

    public get enterHour(): number
    {
        return this._enterHour;
    }

    public get enterMinute(): number
    {
        return this._enterMinute;
    }
}
