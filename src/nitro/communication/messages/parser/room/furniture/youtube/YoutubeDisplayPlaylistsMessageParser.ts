import { IMessageDataWrapper, IMessageParser } from '../../../../../../../api';
import { YoutubeDisplayPlaylist } from './YoutubeDisplayPlaylist';

export class YoutubeDisplayPlaylistsMessageParser implements IMessageParser
{
    private _furniId: number;
    private _playlists: YoutubeDisplayPlaylist[];
    private _selectedPlaylistId: string;

    flush(): boolean
    {
        this._furniId = -1;
        this._playlists = null;
        this._selectedPlaylistId = null;
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._furniId = wrapper.readInt();
        const count = wrapper.readInt();
        this._playlists = [];
        for(let i = 0; i < count; i++)
        {
            this._playlists.push(new YoutubeDisplayPlaylist(wrapper.readString(), wrapper.readString(), wrapper.readString()));
        }
        this._selectedPlaylistId = wrapper.readString();
        return true;
    }

    public get furniId(): number
    {
        return this._furniId;
    }

    public get playlists(): YoutubeDisplayPlaylist[]
    {
        return this._playlists;
    }

    public get selectedPlaylistId(): string
    {
        return this._selectedPlaylistId;
    }
}
