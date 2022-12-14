import { IMessageDataWrapper } from '../../../../../../api';
import { RoomDataParser } from '../../room';

export class OfficialRoomEntryData
{
    public static readonly TYPE_TAG = 1;
    public static readonly TYPE_GUEST_ROOM = 2;
    public static readonly TYPE_FOLDER = 4;

    private _index: number;
    private _popupCaption: string;
    private _popupDesc: string;
    private _showDetails: boolean;
    private _picText: string;
    private _picRef: string;
    private _folderId: number;
    private _userCount: number;
    private _type: number;
    private _tag: string;
    private _guestRoomData: RoomDataParser;
    private _open: boolean;
    private _disposed: boolean;

    constructor(k: IMessageDataWrapper)
    {
        this._index = k.readInt();
        this._popupCaption = k.readString();
        this._popupDesc = k.readString();
        this._showDetails = k.readInt() == 1;
        this._picText = k.readString();
        this._picRef = k.readString();
        this._folderId = k.readInt();
        this._userCount = k.readInt();
        this._type = k.readInt();
        if(this._type == OfficialRoomEntryData.TYPE_TAG)
        {
            this._tag = k.readString();
        }
        else
        {
            if(this._type == OfficialRoomEntryData.TYPE_GUEST_ROOM)
            {
                this._guestRoomData = new RoomDataParser(k);
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
        if(this._guestRoomData != null)
        {
            this._guestRoomData.flush();
            this._guestRoomData = null;
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

    public get popupCaption(): string
    {
        return this._popupCaption;
    }

    public get popupDesc(): string
    {
        return this._popupDesc;
    }

    public get showDetails(): boolean
    {
        return this._showDetails;
    }

    public get picText(): string
    {
        return this._picText;
    }

    public get picRef(): string
    {
        return this._picRef;
    }

    public get folderId(): number
    {
        return this._folderId;
    }

    public get tag(): string
    {
        return this._tag;
    }

    public get userCount(): number
    {
        return this._userCount;
    }

    public get guestRoomData(): RoomDataParser
    {
        return this._guestRoomData;
    }

    public get open(): boolean
    {
        return this._open;
    }

    public toggleOpen(): void
    {
        this._open = !this._open;
    }

    public get maxUsers(): number
    {
        if(this.type == OfficialRoomEntryData.TYPE_TAG)
        {
            return 0;
        }
        if(this.type == OfficialRoomEntryData.TYPE_GUEST_ROOM)
        {
            return this._guestRoomData.maxUserCount;
        }
        return 0;
    }
}
