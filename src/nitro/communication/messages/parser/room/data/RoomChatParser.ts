import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';

export class RoomChatParser
{
    public static _Str_19408: number = 0;
    public static _Str_12787: number = 1;
    public static _Str_16907: number = 0;
    public static _Str_12581: number = 1;
    public static _Str_16484: number = 2;
    public static _Str_18404: number = 0;
    public static _Str_17874: number = 1;
    public static _Str_16469: number = 2;
    public static _Str_21099: number = 0;
    public static _Str_20763: number = 1;
    public static _Str_22060: number = 2;

    private _mode: number;
    private _weight: number;
    private _speed: number;
    private _distance: number;
    private _protection: number;

    constructor(wrapper: IMessageDataWrapper)
    {
        if(!wrapper) throw new Error('invalid_wrapper');

        this.flush();
        this.parse(wrapper);
    }

    public flush(): boolean
    {
        this._mode          = 0;
        this._weight        = 0;
        this._speed         = 0;
        this._distance      = 0;
        this._protection    = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._mode          = wrapper.readInt();
        this._weight        = wrapper.readInt();
        this._speed         = wrapper.readInt();
        this._distance      = wrapper.readInt();
        this._protection    = wrapper.readInt();

        return true;
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