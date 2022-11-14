import { IMessageEvent, IPlaylistController, ISongInfo } from '../../../api';
import { GetJukeboxPlayListMessageComposer, JukeboxPlayListFullMessageEvent, JukeboxSongDisksMessageEvent, NowPlayingMessageEvent } from '../../communication';
import { Nitro } from '../../Nitro';
import { SongDataEntry } from '../common/SongDataEntry';
import { NowPlayingEvent, PlayListStatusEvent, SongInfoReceivedEvent } from '../events';
import { MusicPriorities } from './MusicPriorities';

export class JukeboxPlaylistController implements IPlaylistController
{
    private _isPlaying = false;
    private _entries: ISongInfo[];
    private _currentEntryId: number;
    private _missingSongInfo: number[];
    private _playPosition: number;
    private _disposed: boolean = false;

    private _messageEvents: IMessageEvent[];

    constructor()
    {
        this._entries = [];
        this._missingSongInfo = [];

        this._messageEvents = [
            new NowPlayingMessageEvent(this.onNowPlayingMessageEvent.bind(this)),
            new JukeboxSongDisksMessageEvent(this.onJukeboxSongDisksMessageEvent.bind(this)),
            new JukeboxPlayListFullMessageEvent(this.onJukeboxPlayListFullMessageEvent.bind(this))
        ];

        this.onSongInfoReceivedEvent = this.onSongInfoReceivedEvent.bind(this);
    }

    public init(): void
    {
        this._messageEvents.forEach(event => Nitro.instance.communication.connection.addMessageEvent(event));
        //this._events.addEventListener(SoundManagerEvent.TRAX_SONG_COMPLETE, this.onSongFinishedPlayingEvent);
        Nitro.instance.soundManager.events.addEventListener(SongInfoReceivedEvent.SIR_TRAX_SONG_INFO_RECEIVED, this.onSongInfoReceivedEvent);
    }

    public get priority(): number
    {
        return MusicPriorities.PRIORITY_ROOM_PLAYLIST;
    }

    private onNowPlayingMessageEvent(event: NowPlayingMessageEvent): void
    {
        const parser = event.getParser();

        this._isPlaying = (parser.currentSongId !== -1);

        if(parser.currentSongId >= 0)
        {
            Nitro.instance.soundManager.musicController.playSong(parser.currentSongId, MusicPriorities.PRIORITY_ROOM_PLAYLIST, (parser.syncCount / 1000), 0, 1, 1);
            this._currentEntryId = parser.currentSongId;
        }
        else
        {
            this.stopPlaying();
        }

        if(parser.nextSongId >= 0) Nitro.instance.soundManager.musicController.addSongInfoRequest(parser.nextSongId);

        this._playPosition = parser.currentPosition;
        //Dispatch local event NowPlayingEvent
        Nitro.instance.soundManager.events.dispatchEvent(new NowPlayingEvent(NowPlayingEvent.NPE_SONG_CHANGED, MusicPriorities.PRIORITY_ROOM_PLAYLIST, parser.currentSongId, parser.currentPosition));
    }

    private onJukeboxSongDisksMessageEvent(event: JukeboxSongDisksMessageEvent): void
    {
        const parser = event.getParser();

        this._entries = [];
        for(let i = 0; i < parser.songDisks.length; i++)
        {
            const songId = parser.songDisks.getWithIndex(i);
            const diskId = parser.songDisks.getKey(i);
            let songInfo = (Nitro.instance.soundManager.musicController.getSongInfo(songId) as SongDataEntry);
            if(songInfo == null)
            {
                songInfo = new SongDataEntry(songId, -1, null, null, null);
                if(this._missingSongInfo.indexOf(songId) < 0)
                {
                    this._missingSongInfo.push(songId);
                    Nitro.instance.soundManager.musicController.requestSongInfoWithoutSamples(songId);
                }
            }
            songInfo.diskId = diskId;
            this._entries.push(songInfo);
        }
        if(this._missingSongInfo.length == 0)
        {
            Nitro.instance.soundManager.events.dispatchEvent(new PlayListStatusEvent(PlayListStatusEvent.PLUE_PLAY_LIST_UPDATED));
        }
    }

    private onJukeboxPlayListFullMessageEvent(event: JukeboxPlayListFullMessageEvent): void
    {
        Nitro.instance.soundManager.events.dispatchEvent(new PlayListStatusEvent(PlayListStatusEvent.PLUE_PLAY_LIST_FULL));
    }

    private onSongInfoReceivedEvent(songInfoEvent: SongInfoReceivedEvent): void
    {
        for(let i = 0; i < this.length; i++)
        {
            const songData = this._entries[i];
            if(songData.id === songInfoEvent.id)
            {
                const diskId = songData.diskId;
                const updatedSongData = Nitro.instance.soundManager.musicController.getSongInfo(songInfoEvent.id);
                if(updatedSongData != null)
                {
                    updatedSongData.diskId = diskId;
                    this._entries[i] = updatedSongData;
                }
                break;
            }
        }
        const _local_3 = this._missingSongInfo.indexOf(songInfoEvent.id);
        if(_local_3 >= 0)
        {
            this._missingSongInfo.splice(_local_3, 1);
        }
        if(this._missingSongInfo.length == 0)
        {
            Nitro.instance.soundManager.events.dispatchEvent(new PlayListStatusEvent(PlayListStatusEvent.PLUE_PLAY_LIST_UPDATED));
        }
    }

    public stopPlaying(): void
    {
        Nitro.instance.soundManager.musicController.stop(this.priority);
        this._currentEntryId = -1;
        this._playPosition = -1;
        this._isPlaying = false;
    }

    public get length(): number
    {
        if(!this._entries)
        {
            return 0;
        }
        return this._entries.length;
    }

    public get playPosition(): number
    {
        return this._playPosition;
    }

    public get nowPlayingSongId(): number
    {
        return this._currentEntryId;
    }

    public get isPlaying(): boolean
    {
        return this._isPlaying;
    }

    public get entries(): ISongInfo[]
    {
        return this._entries;
    }

    public getEntry(k: number): ISongInfo
    {
        if(((k < 0) || (k >= this._entries.length)))
        {
            return null;
        }
        return this._entries[k];
    }

    public requestPlayList(): void
    {
        Nitro.instance.communication.connection.send(new GetJukeboxPlayListMessageComposer());
    }

    public dispose(): void
    {
        if(!this._disposed)
        {
            this._disposed = true;
            this.stopPlaying();
            if(Nitro.instance.soundManager.events)
            {
                Nitro.instance.soundManager.events.removeEventListener(SongInfoReceivedEvent.SIR_TRAX_SONG_INFO_RECEIVED, this.onSongInfoReceivedEvent);
            }
            this._messageEvents.forEach(event => Nitro.instance.communication.connection.removeMessageEvent(event));
            this._messageEvents = null;
            //this._events.removeEventListener(SoundControllerEvent.TRAX_SONG_COMPLETE, this.onSongFinishedPlayingEvent);
        }
    }
}
