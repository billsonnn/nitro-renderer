import { IMessageDataWrapper } from '../../../../../../core/communication/messages/IMessageDataWrapper';
import { RoomDataParser } from '../../room';

export class OfficialRoomEntryData
{
    public static readonly _Str_14955 = 1;
    public static readonly _Str_12025 = 2;
    public static readonly _Str_16098 = 4;

    private _index: number;
    private _Str_20260: string;
    private _Str_21337: string;
    private _Str_21113: boolean;
    private _picText: string;
    private _Str_6192: string;
    private _Str_22099: number;
    private _userCount: number;
    private _type: number;
    private _tag: string;
    private _Str_2567: RoomDataParser;
    private _open: boolean;
    private _disposed: boolean;

    constructor(k: IMessageDataWrapper)
    {
        this._index = k.readInt();
        this._Str_20260 = k.readString();
        this._Str_21337 = k.readString();
        this._Str_21113 = k.readInt() == 1;
        this._picText = k.readString();
        this._Str_6192 = k.readString();
        this._Str_22099 = k.readInt();
        this._userCount = k.readInt();
        this._type = k.readInt();
        if(this._type == OfficialRoomEntryData._Str_14955)
        {
            this._tag = k.readString();
        }
        else
        {
            if(this._type == OfficialRoomEntryData._Str_12025)
            {
                this._Str_2567 = new RoomDataParser(k);
            }
            else
            {
                this._open = k.readBoolean();
            }
        }
    }

    public dispose(): void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        if(this._Str_2567 != null)
        {
            this._Str_2567.flush();
            this._Str_2567 = null;
        }
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get type(): number
    {
        return this._type;
    }

    public get index(): number
    {
        return this._index;
    }

    public get _Str_9428(): string
    {
        return this._Str_20260;
    }

    public get _Str_22426(): string
    {
        return this._Str_21337;
    }

    public get _Str_5386(): boolean
    {
        return this._Str_21113;
    }

    public get picText(): string
    {
        return this._picText;
    }

    public get _Str_10304(): string
    {
        return this._Str_6192;
    }

    public get _Str_22186(): number
    {
        return this._Str_22099;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public get userCount(): number
    {
        return this._userCount;
    }

    public get _Str_5019(): RoomDataParser
    {
        return this._Str_2567;
    }

    public get open(): boolean
    {
        return this._open;
    }

    public _Str_16147(): void
    {
        this._open = !this._open;
    }

    public get _Str_23003(): number
    {
        if(this.type == OfficialRoomEntryData._Str_14955)
        {
            return 0;
        }
        if(this.type == OfficialRoomEntryData._Str_12025)
        {
            return this._Str_2567.maxUserCount;
        }
        return 0;
    }
}
