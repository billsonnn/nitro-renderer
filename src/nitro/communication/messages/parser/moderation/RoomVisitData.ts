import { IMessageDataWrapper } from '../../../../../api';

export class RoomVisitData
{
    private _roomId: number;
    private _roomName: string;
    private _enterHour: number;
    private _enterMinute: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._roomId = wrapper.readInt();
        this._roomName = wrapper.readString();
        this._enterHour = wrapper.readInt();
        this._enterMinute = wrapper.readInt();
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
