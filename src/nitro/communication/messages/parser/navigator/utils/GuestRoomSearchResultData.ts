import { IMessageDataWrapper } from '../../../../../../api';
import { RoomDataParser } from '../../room';
import { OfficialRoomEntryData } from './OfficialRoomEntryData';

export class GuestRoomSearchResultData
{
    private _searchType: number;
    private _searchParam: string;
    private _rooms: RoomDataParser[];
    private _ad: OfficialRoomEntryData;
    private _disposed: boolean;

    constructor(wrapper: IMessageDataWrapper)
    {
        this._rooms = [];
        this._searchType = wrapper.readInt();
        this._searchParam = wrapper.readString();

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._rooms.push(new RoomDataParser(wrapper));
        }

        const hasAdditional = wrapper.readBoolean();

        if(hasAdditional)
        {
            this._ad = new OfficialRoomEntryData(wrapper);
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
