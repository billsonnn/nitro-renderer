import { IMessageDataWrapper } from '@nitrots/api';

export class RoomChatSettings
{
    public static CHAT_MODE_FREE_FLOW: number = 0;
    public static CHAT_MODE_LINE_BY_LINE: number = 1;
    public static CHAT_BUBBLE_WIDTH_WIDE: number = 0;
    public static CHAT_BUBBLE_WIDTH_NORMAL: number = 1;
    public static CHAT_BUBBLE_WIDTH_THIN: number = 2;
    public static CHAT_SCROLL_SPEED_FAST: number = 0;
    public static CHAT_SCROLL_SPEED_NORMAL: number = 1;
    public static CHAT_SCROLL_SPEED_SLOW: number = 2;
    public static FLOOD_FILTER_STRICT: number = 0;
    public static FLOOD_FILTER_NORMAL: number = 1;
    public static FLOOD_FILTER_LOOSE: number = 2;

    private _mode: number;
    private _weight: number;
    private _speed: number;
    private _distance: number;
    private _protection: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this._mode = wrapper.readInt();
        this._weight = wrapper.readInt();
        this._speed = wrapper.readInt();
        this._distance = wrapper.readInt();
        this._protection = wrapper.readInt();
    }

    public get mode(): number
    {
        return this._mode;
    }
    public get weight(): number
    {
        return this._weight;
    }

    public get speed(): number
    {
        return this._speed;
    }

    public get distance(): number
    {
        return this._distance;
    }

    public get protection(): number
    {
        return this._protection;
    }
}
