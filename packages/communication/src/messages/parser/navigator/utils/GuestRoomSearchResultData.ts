import { IMessageDataWrapper } from '@nitrots/api';
import { RoomDataParser } from '../../room';
import { OfficialRoomEntryData } from './OfficialRoomEntryData';

export class GuestRoomSearchResultData
{
    private _searchType: number;
    private _searchParam: string;
    private _rooms: RoomDataParser[];
    private _ad: OfficialRoomEntryData;
    private _disposed: boolean;

    constructor(k: IMessageDataWrapper)
    {
        this._rooms = [];
        this._searchType = k.readInt();
        this._searchParam = k.readString();
        const count = k.readInt();
        for(let i = 0; i < count; i++)
        {
            this._rooms.push(new RoomDataParser(k));
        }
        const hasAdditional = k.readBoolean();
        if(hasAdditional)
        {
            this._ad = new OfficialRoomEntryData(k);
        }
    }

    public dispose(): void
    {
        if(this._disposed)
        {
            return;
        }
        this._disposed = true;
        if(this._rooms != null)
        {
            for(const k of this._rooms)
            {
                k.flush();
            }
        }
        if(this._ad != null)
        {
            this._ad.dispose();
            this._ad = null;
        }
        this._rooms = null;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get searchType(): number
    {
        return this._searchType;
    }

    public get searchParam(): string
    {
        return this._searchParam;
    }

    public get rooms(): RoomDataParser[]
    {
        return this._rooms;
    }

    public get ad(): OfficialRoomEntryData
    {
        return this._ad;
    }
}
