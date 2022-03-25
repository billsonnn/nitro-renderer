import { NitroManager } from '../../../core/common/NitroManager';
import { NitroEvent } from '../../../core/events/NitroEvent';
import { JukeboxPlayListFullMessageEvent } from '../../communication/messages/incoming/sound/JukeboxPlayListFullMessageEvent';
import { JukeboxSongDisksMessageEvent } from '../../communication/messages/incoming/sound/JukeboxSongDisksMessageEvent';
import { NowPlayingMessageEvent } from '../../communication/messages/incoming/sound/NowPlayingMessageEvent';
import { TraxSongInfoMessageEvent } from '../../communication/messages/incoming/sound/TraxSongInfoMessageEvent';
import { UserSongDisksInventoryMessageEvent } from '../../communication/messages/incoming/sound/UserSongDisksInventoryMessageEvent';
import { GetSongInfoMessageComposer } from '../../communication/messages/outgoing/sound/GetSongInfoMessageComposer';
import { Nitro } from '../../Nitro';
import { RoomObjectSoundMachineEvent } from '../../room/events/RoomObjectSoundMachineEvent';
import { SongStartRequestData } from '../common/SongStartRequestData';
import { SoundManagerEvent } from '../events/SoundManagerEvent';
import { SongInfoEntry } from './../../communication/messages/incoming/sound/SongInfoEntry';
import { IMusicManager } from './IMusicManager';
import { MusicPriorities } from './MusicPriorities';

export class MusicManager extends NitroManager implements IMusicManager
{
    public static readonly SKIP_POSITION_SET: number = -1;
    private static readonly MAXIMUM_NOTIFY_PRIORITY: number = MusicPriorities.PRIORITY_ROOM_PLAYLIST;

    private _timerInstance: any;
    private _songRequestList: number[];
    private _requestedSongs: Map<number, boolean>;
    private _availableSongs: Map<number, SongInfoEntry>;
    private _songRequestsPerPriority: SongStartRequestData[];

    private _currentEntryId: number;
    private _playPosition: number;
    private _isPlaying: boolean;

    constructor()
    {
        super();

        this._timerInstance = null;
        this._songRequestList = [];
        this._requestedSongs = new Map();
        this._availableSongs = new Map();
        this._songRequestsPerPriority = [];

        this._currentEntryId = -1;
        this._playPosition = -1;
        this._isPlaying = false;

        this.onEvent = this.onEvent.bind(this);

        this._timerInstance = setInterval(this.onTick.bind(this), 1000);
    }

    public onInit(): void
    {
        Nitro.instance.communication.connection.addMessageEvent(new TraxSongInfoMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.addMessageEvent(new UserSongDisksInventoryMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.addMessageEvent(new NowPlayingMessageEvent(this.onNowPlayingMessageEvent.bind(this)));
        Nitro.instance.communication.connection.addMessageEvent(new JukeboxSongDisksMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.addMessageEvent(new JukeboxPlayListFullMessageEvent(this.onEvent));
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.JUKEBOX_INIT, this.onEvent);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.JUKEBOX_DISPOSE, this.onEvent);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_INIT, this.onEvent);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_DISPOSE, this.onEvent);
        this.events.addEventListener(SoundManagerEvent.TRAX_SONG_COMPLETE, this.onEvent);
    }

    public onDispose(): void
    {
        if(this._timerInstance)
        {
            clearInterval(this._timerInstance);
            this._timerInstance = null;
        }

        Nitro.instance.communication.connection.removeMessageEvent(new TraxSongInfoMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.removeMessageEvent(new UserSongDisksInventoryMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.removeMessageEvent(new NowPlayingMessageEvent(this.onNowPlayingMessageEvent.bind(this)));
        Nitro.instance.communication.connection.removeMessageEvent(new JukeboxSongDisksMessageEvent(this.onEvent));
        Nitro.instance.communication.connection.removeMessageEvent(new JukeboxPlayListFullMessageEvent(this.onEvent));
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.JUKEBOX_INIT, this.onEvent);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.JUKEBOX_DISPOSE, this.onEvent);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_INIT, this.onEvent);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_DISPOSE, this.onEvent);
        this.events.removeEventListener(SoundManagerEvent.TRAX_SONG_COMPLETE, this.onEvent);
    }

    private onEvent(event: NitroEvent): void
    {

    }

    private onTraxSongInfoMessageEvent(event: TraxSongInfoMessageEvent): void
    {
        const parser = event.getParser();

        for(const song of parser.songs)
        {
            const songAvailable: boolean = (this._availableSongs.get(song.id) !== null);
            const areSamplesRequested: boolean = (this._requestedSongs.get(song.id) !== null);

            if(!songAvailable)
            {
                if(areSamplesRequested)
                {
                    //LoadTraxSong
                }

                const songInfoEntry: SongInfoEntry = new SongInfoEntry(song.id, song.length, song.name, song.creator, song.data);
                this._availableSongs.set(song.id, songInfoEntry);

                const topRequestPriotityIndex: number = this.getTopRequestPriority();
                const songId: number = this.getSongIdRequestedAtPriority(topRequestPriotityIndex);


            }
        }
    }

    private onNowPlayingMessageEvent(event: NowPlayingMessageEvent): void
    {
        const parser = event.getParser();

        this._isPlaying = (parser.currentSongId !== -1);

        if(parser.currentSongId >= 0)
        {
            this.playSong(parser.currentSongId, MusicPriorities.PRIORITY_ROOM_PLAYLIST, (parser.syncCount / 1000), 0, 1, 1);
        }
        else
        {
            this.stopPlaying();
        }

        if(parser.nextSongId >= 0) this.requestSong(parser.nextSongId, true);

        this._playPosition = parser.currentPosition;
        //Dispatch local event NowPlayingEvent
    }

    private onTick(): void
    {
        if(this._songRequestList.length === 0) return;

        Nitro.instance.communication.connection.send(new GetSongInfoMessageComposer(...this._songRequestList));
        this._songRequestList = [];
    }

    private requestSong(songId: number, arg2: boolean): void
    {
        if(this._requestedSongs.get(songId) === null)
        {
            this._requestedSongs.set(songId, arg2);
            this._songRequestList.push(songId);
        }
    }

    private playSong(songId: number, priority: number, startPos: number = 0, playLength: number = 0, fadeInSeconds: number = 0.5, fadeOutSeconds: number = 0.5)
    {

    }

    private stopPlaying(): void
    {
        this._currentEntryId = -1;
        this._playPosition = -1;
        this._isPlaying = false;
    }

    private getTopRequestPriority(): number
    {
        return this._songRequestsPerPriority.length - 1;
    }

    private getSongIdRequestedAtPriority(priorityIndex: number): number
    {
        if(priorityIndex < 0 || priorityIndex >= MusicPriorities.PRIORITY_COUNT) return -1;

        if(!this._songRequestsPerPriority[priorityIndex]) return -1;

        return this._songRequestsPerPriority[priorityIndex].songId;
    }

    public get playPosition(): number
    {
        return this._playPosition;
    }

    public set playPosition(value: number)
    {
        this._playPosition = value;
    }
}
