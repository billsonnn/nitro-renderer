import { AdvancedMap, IAdvancedMap, IMessageEvent, IMusicController, IPlaylistController, ISongInfo } from '../../../api';
import { RoomObjectSoundMachineEvent } from '../../../events';
import { GetNowPlayingMessageComposer, GetSongInfoMessageComposer, GetUserSongDisksMessageComposer, TraxSongInfoMessageEvent, UserSongDisksInventoryMessageEvent } from '../../communication';
import { Nitro } from '../../Nitro';
import { SongDataEntry } from '../common/SongDataEntry';
import { SongStartRequestData } from '../common/SongStartRequestData';
import { NotifyPlayedSongEvent, NowPlayingEvent, SongDiskInventoryReceivedEvent, SongInfoReceivedEvent, SoundManagerEvent } from '../events';
import { TraxData } from '../trax/TraxData';
import { JukeboxPlaylistController } from './JukeboxPlaylistController';
import { MusicPlayer } from './MusicPlayer';
import { MusicPriorities } from './MusicPriorities';

export class MusicController implements IMusicController
{
    public static readonly SKIP_POSITION_SET: number = -1;
    private static readonly MAXIMUM_NOTIFY_PRIORITY: number = MusicPriorities.PRIORITY_ROOM_PLAYLIST;

    private _timerInstance: number;
    private _songRequestList: number[];
    private _requestedSongs: Map<number, boolean>;
    private _availableSongs: Map<number, SongDataEntry>;
    private _songRequestsPerPriority: SongStartRequestData[];
    private _songRequestCountsPerPriority: number[];
    private _diskInventoryMissingData: number[];
    private _songDiskInventory: IAdvancedMap<number, number>;
    private _priorityPlaying: number = -1;
    private _requestNumberPlaying: number = -1;
    private _messageEvents: IMessageEvent[];
    private _roomItemPlaylist: IPlaylistController;
    private _musicPlayer: MusicPlayer;

    private _songIdPlaying: number;
    private _previousNotifiedSongId: number;
    private _previousNotificationTime: number = -1;

    constructor()
    {
        this._timerInstance = -1;
        this._songRequestList = [];
        this._requestedSongs = new Map<number, boolean>();
        this._availableSongs = new Map<number, SongDataEntry>();
        this._songDiskInventory = new AdvancedMap<number, number>();
        this._songRequestsPerPriority = [];
        this._songRequestCountsPerPriority = [];
        this._diskInventoryMissingData = [];
        this._songIdPlaying = -1;
        this._previousNotifiedSongId = -1;


        this._messageEvents = [
            new TraxSongInfoMessageEvent(this.onTraxSongInfoMessageEvent.bind(this)),
            new UserSongDisksInventoryMessageEvent(this.onSongDiskInventoryMessage.bind(this))
        ];

        this.onJukeboxInit = this.onJukeboxInit.bind(this);
        this.onJukeboxDispose = this.onJukeboxDispose.bind(this);
        this.onSoundMachineInit = this.onSoundMachineInit.bind(this);
        this.onSoundMachineDispose = this.onSoundMachineDispose.bind(this);

        this.onTraxSongComplete = this.onTraxSongComplete.bind(this);
    }

    public init(): void
    {
        this._timerInstance = window.setInterval(this.onTick.bind(this), 1000);
        this._musicPlayer = new MusicPlayer(Nitro.instance.getConfiguration<string>('external.samples.url'));

        this._messageEvents.forEach(event => Nitro.instance.communication.connection.addMessageEvent(event));

        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.JUKEBOX_INIT, this.onJukeboxInit);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.JUKEBOX_DISPOSE, this.onJukeboxDispose);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_INIT, this.onSoundMachineInit);
        Nitro.instance.roomEngine.events.addEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_DISPOSE, this.onSoundMachineDispose);

        Nitro.instance.soundManager.events.addEventListener(SoundManagerEvent.TRAX_SONG_COMPLETE, this.onTraxSongComplete);
    }

    public getRoomItemPlaylist(_arg_1?: number): IPlaylistController
    {
        return this._roomItemPlaylist;
    }

    public get songDiskInventory(): IAdvancedMap<number, number>
    {
        return this._songDiskInventory;
    }

    public getSongDiskInventorySize(): number
    {
        return this._songDiskInventory.length;
    }

    public getSongDiskInventoryDiskId(k: number): number
    {
        if(((k >= 0) && (k < this._songDiskInventory.length)))
        {
            return this._songDiskInventory.getKey(k);
        }
        return -1;
    }

    public getSongDiskInventorySongId(k: number): number
    {
        if(((k >= 0) && (k < this._songDiskInventory.length)))
        {
            return this._songDiskInventory.getWithIndex(k);
        }
        return -1;
    }

    public getSongInfo(k: number): ISongInfo
    {
        const _local_2: SongDataEntry = this.getSongDataEntry(k);
        if(!_local_2)
        {
            this.requestSongInfoWithoutSamples(k);
        }
        return _local_2;
    }

    public getSongIdPlayingAtPriority(priority: number): number
    {
        if(priority !== this._priorityPlaying)
        {
            return -1;
        }
        return this._songIdPlaying;
    }

    public stop(priority: number): void
    {
        const isCurrentPlayingPriority = (priority === this._priorityPlaying);
        const isTopRequestPriority = (this.getTopRequestPriority() === priority);
        if(isCurrentPlayingPriority)
        {
            this.resetSongStartRequest(priority);
            this.stopSongAtPriority(priority);
        }
        else
        {
            this.resetSongStartRequest(priority);
            if(isTopRequestPriority)
            {
                this.reRequestSongAtPriority(this._priorityPlaying);
            }
        }
    }

    public addSongInfoRequest(k: number): void
    {
        this.requestSong(k, true);
    }

    public requestSongInfoWithoutSamples(k: number): void
    {
        this.requestSong(k, false);
    }

    public requestUserSongDisks(): void
    {
        Nitro.instance.communication.connection.send(new GetUserSongDisksMessageComposer());
    }

    public updateVolume(_arg_1: number): void
    {
        this._musicPlayer.setVolume(_arg_1);
    }

    public dispose(): void
    {
        if(this._timerInstance)
        {
            clearInterval(this._timerInstance);
            this._timerInstance = undefined;
        }

        this._messageEvents.forEach(event => Nitro.instance.communication.connection.removeMessageEvent(event));

        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.JUKEBOX_INIT, this.onJukeboxInit);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.JUKEBOX_DISPOSE, this.onJukeboxDispose);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_INIT, this.onSoundMachineInit);
        Nitro.instance.roomEngine.events.removeEventListener(RoomObjectSoundMachineEvent.SOUND_MACHINE_DISPOSE, this.onSoundMachineDispose);
        Nitro.instance.soundManager.events.removeEventListener(SoundManagerEvent.TRAX_SONG_COMPLETE, this.onTraxSongComplete);
    }

    public get samplesIdsInUse(): number[]
    {
        let _local_3: SongStartRequestData;
        let _local_4: SongDataEntry;
        let k = [];
        for(let i = 0; i < this._songRequestsPerPriority.length; i++)
        {
            if(this._songRequestsPerPriority[i])
            {
                _local_3 = this._songRequestsPerPriority[i];
                _local_4 = this._availableSongs.get(_local_3.songId);
                if(_local_4)
                {
                    const songData = _local_4.songData;
                    if(songData.length > 0)
                    {
                        const traxData = new TraxData(songData);
                        k = k.concat(traxData.getSampleIds());
                    }
                }
            }
        }
        return k;
    }

    public onSongLoaded(songId: number): void
    {
        const priority = this.getTopRequestPriority();
        if(priority >= 0)
        {
            const songIdAtTopPriority = this.getSongIdRequestedAtPriority(priority);
            if(songId === songIdAtTopPriority)
            {
                this.playSongObject(priority, songId);
            }
        }
    }

    public samplesUnloaded(_arg_1: number[]): void
    {
        throw new Error('Method not implemented.');
    }

    protected onTraxSongComplete(k: SoundManagerEvent): void
    {
        if(this.getSongIdPlayingAtPriority(this._priorityPlaying) === k.id)
        {
            if(((this.getTopRequestPriority() === this._priorityPlaying) && (this.getSongRequestCountAtPriority(this._priorityPlaying) == this._requestNumberPlaying)))
            {
                this.resetSongStartRequest(this._priorityPlaying);
            }
            const priorityPlaying = this._priorityPlaying;
            this.playSongWithHighestPriority();
            if(priorityPlaying >= MusicPriorities.PRIORITY_SONG_PLAY)
            {
                Nitro.instance.soundManager.events.dispatchEvent(new NowPlayingEvent(NowPlayingEvent.NPW_USER_STOP_SONG, priorityPlaying, k.id, -1));
            }
        }
    }

    private onTraxSongInfoMessageEvent(event: TraxSongInfoMessageEvent): void
    {
        const parser = event.getParser();

        for(const song of parser.songs)
        {
            const songAvailable = !!this.getSongDataEntry(song.id);
            const areSamplesRequested = !!this.areSamplesRequested(song.id);

            if(!songAvailable)
            {
                if(!areSamplesRequested)
                {
                    //_local_9 = this._soundManager.loadTraxSong(_local_6.id, _local_6.data);
                }

                const songInfoEntry: SongDataEntry = new SongDataEntry(song.id, song.length, song.name, song.creator, song.data);
                this._availableSongs.set(song.id, songInfoEntry);

                const topRequestPriotityIndex: number = this.getTopRequestPriority();
                const songId: number = this.getSongIdRequestedAtPriority(topRequestPriotityIndex);
                if(song.id === songId)
                {
                    this.playSongObject(topRequestPriotityIndex, songId);
                }
                Nitro.instance.soundManager.events.dispatchEvent(new SongInfoReceivedEvent(SongInfoReceivedEvent.SIR_TRAX_SONG_INFO_RECEIVED, song.id));
                while(this._diskInventoryMissingData.indexOf(song.id) != -1)
                {
                    this._diskInventoryMissingData.splice(this._diskInventoryMissingData.indexOf(song.id), 1);
                    if(this._diskInventoryMissingData.length === 0)
                    {
                        Nitro.instance.soundManager.events.dispatchEvent(new SongDiskInventoryReceivedEvent(SongDiskInventoryReceivedEvent.SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT));
                    }
                }

            }
        }
    }

    private onSongDiskInventoryMessage(event: UserSongDisksInventoryMessageEvent): void
    {
        const parser = event.getParser();

        this._songDiskInventory.reset();
        for(let i = 0; i < parser.songDiskCount; i++)
        {
            const diskId = parser.getDiskId(i);
            const songId = parser.getSongId(i);
            this._songDiskInventory.add(diskId, songId);

            if(!this._availableSongs.get(songId))
            {
                this._diskInventoryMissingData.push(songId);
                this.requestSongInfoWithoutSamples(songId);
            }
        }
        if(this._diskInventoryMissingData.length === 0)
        {
            Nitro.instance.soundManager.events.dispatchEvent(new SongDiskInventoryReceivedEvent(SongDiskInventoryReceivedEvent.SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT));
        }
    }

    private onTick(): void
    {
        if(this._songRequestList.length === 0) return;

        Nitro.instance.communication.connection.send(new GetSongInfoMessageComposer(...this._songRequestList));
        this._songRequestList = [];
    }

    private requestSong(songId: number, arg2: boolean): void
    {
        if(this._requestedSongs.get(songId) === undefined)
        {
            this._requestedSongs.set(songId, arg2);
            this._songRequestList.push(songId);
        }
    }

    private areSamplesRequested(k: number): boolean
    {
        if(!this._requestedSongs.get(k))
        {
            return false;
        }
        return this._requestedSongs.get(k);
    }

    private processSongEntryForPlaying(k: number, _arg_2: boolean = true): boolean
    {
        const songData: SongDataEntry = this.getSongDataEntry(k);
        if(!songData)
        {
            this.addSongInfoRequest(k);
            return false;
        }
        /* if(_local_3.soundObject == null)
        {
            _local_3.soundObject = this._soundManager.loadTraxSong(_local_3.id, _local_3.songData);
        }
        const _local_4:IHabboSound = _local_3.soundObject;
        if(!_local_4.ready)
        {
            return false;
        } */
        return true;
    }

    public playSong(songId: number, priority: number, startPos: number = 0, playLength: number = 0, fadeInSeconds: number = 0.5, fadeOutSeconds: number = 0.5): boolean
    {
        if(!this.addSongStartRequest(priority, songId, startPos, playLength, fadeInSeconds, fadeOutSeconds))
        {
            return false;
        }
        if(!this.processSongEntryForPlaying(songId))
        {
            return false;
        }
        if(priority >= this._priorityPlaying)
        {
            this.playSongObject(priority, songId);
        }
        return true;
    }

    private playSongObject(priority: number, songId: number): boolean
    {
        if((((songId === -1) || (priority < 0)) || (priority >= MusicPriorities.PRIORITY_COUNT)))
        {
            return false;
        }
        let _local_3 = false;
        if(this.stopSongAtPriority(this._priorityPlaying))
        {
            _local_3 = true;
        }
        const songData: SongDataEntry = this.getSongDataEntry(songId);
        if(!songData)
        {
            return false;
        }
        if(_local_3)
        {
            return true;
        }
        this._musicPlayer.setVolume(Nitro.instance.soundManager.traxVolume);
        let startPos = MusicController.SKIP_POSITION_SET;
        let playLength = 0;
        let fadeInSeconds = 2;
        let fadeOutSeconds = 1;

        const songRequestData: SongStartRequestData = this.getSongStartRequest(priority);

        if(songRequestData)
        {
            startPos = songRequestData.startPos;
            playLength = songRequestData.playLength;
            fadeInSeconds = songRequestData.fadeInSeconds;
            fadeOutSeconds = songRequestData.fadeOutSeconds;
        }
        if(startPos >= (songData.length / 1000))
        {
            return false;
        }
        if(startPos <= MusicController.SKIP_POSITION_SET)
        {
            startPos = 0;
        }

        startPos = Math.trunc(startPos);
        /*
        _local_5.fadeInSeconds = _local_8;
        _local_5.fadeOutSeconds = _local_9;
        _local_5.position = _local_6;
        _local_5.play(_local_7);
        */

        this._priorityPlaying = priority;
        this._requestNumberPlaying = this.getSongRequestCountAtPriority(priority);
        this._songIdPlaying = songId;
        if(this._priorityPlaying <= MusicController.MAXIMUM_NOTIFY_PRIORITY)
        {
            this.notifySongPlaying(songData);
        }
        this._musicPlayer.preloadSamplesForSong(songData.songData).then(() => this._musicPlayer.play(songData.songData, songData.id, startPos, playLength));
        if(priority > MusicPriorities.PRIORITY_ROOM_PLAYLIST)
        {
            Nitro.instance.soundManager.events.dispatchEvent(new NowPlayingEvent(NowPlayingEvent.NPE_USER_PLAY_SONG, priority, songData.id, -1));
        }
        return true;
    }

    private notifySongPlaying(k: SongDataEntry): void
    {
        const _local_2 = 8000;
        const timeNow = Date.now();
        if(((k.length >= _local_2) && ((!(this._previousNotifiedSongId == k.id)) || (timeNow > (this._previousNotificationTime + _local_2)))))
        {
            Nitro.instance.soundManager.events.dispatchEvent(new NotifyPlayedSongEvent(k.name, k.creator));
            this._previousNotifiedSongId = k.id;
            this._previousNotificationTime = timeNow;
        }
    }

    private addSongStartRequest(priority: number, songId: number, startPos: number, playLength: number, fadeInSeconds: number, fadeOutSeconds: number): boolean
    {
        if(((priority < 0) || (priority >= MusicPriorities.PRIORITY_COUNT)))
        {
            return false;
        }
        const songStartRequest = new SongStartRequestData(songId, startPos, playLength, fadeInSeconds, fadeOutSeconds);
        this._songRequestsPerPriority[priority] = songStartRequest;
        this._songRequestCountsPerPriority[priority] = (this._songRequestCountsPerPriority[priority] + 1);
        return true;
    }

    private getSongDataEntry(k: number): SongDataEntry
    {
        let entry: SongDataEntry;
        if(this._availableSongs)
        {
            entry = (this._availableSongs.get(k));
        }
        return entry;
    }

    private getSongStartRequest(k: number): SongStartRequestData
    {
        return this._songRequestsPerPriority[k];
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

    private getSongRequestCountAtPriority(k: number): number
    {
        if(((k < 0) || (k >= MusicPriorities.PRIORITY_COUNT)))
        {
            return -1;
        }
        return this._songRequestCountsPerPriority[k];
    }

    private playSongWithHighestPriority(): void
    {
        let _local_3: number;
        this._priorityPlaying = -1;
        this._songIdPlaying = -1;
        this._requestNumberPlaying = -1;
        const k = this.getTopRequestPriority();
        let _local_2 = k;
        while(_local_2 >= 0)
        {
            _local_3 = this.getSongIdRequestedAtPriority(_local_2);
            if(((_local_3 >= 0) && (this.playSongObject(_local_2, _local_3))))
            {
                return;
            }
            _local_2--;
        }
    }

    private resetSongStartRequest(priority: number): void
    {
        if(((priority >= 0) && (priority < MusicPriorities.PRIORITY_COUNT)))
        {
            this._songRequestsPerPriority[priority] = undefined;
        }
    }

    private reRequestSongAtPriority(k: number): void
    {
        this._songRequestCountsPerPriority[k] = (this._songRequestCountsPerPriority[k] + 1);
    }

    private stopSongAtPriority(priority: number): boolean
    {
        if(((priority === this._priorityPlaying) && (this._priorityPlaying >= 0)))
        {
            const songIdAtPriority = this.getSongIdPlayingAtPriority(priority);
            if(songIdAtPriority >= 0)
            {
                const songData = this.getSongDataEntry(songIdAtPriority);
                //this.stopSongDataEntry(_local_3);
                this._musicPlayer.stop();
                return true;
            }
        }
        return false;
    }

    private onSoundMachineInit(k: Event): void
    {
        this.disposeRoomPlaylist();
        //this._roomItemPlaylist = (new SoundMachinePlayListController(this._soundManager, this, this._events) as IPlaylistController);
    }

    private onSoundMachineDispose(k: Event): void
    {
        this.disposeRoomPlaylist();
    }

    private onJukeboxInit(k: Event): void
    {
        this.disposeRoomPlaylist();
        this._roomItemPlaylist = (new JukeboxPlaylistController() as IPlaylistController);
        this._roomItemPlaylist.init();
        Nitro.instance.communication.connection.send(new GetNowPlayingMessageComposer());
    }

    private onJukeboxDispose(k: Event): void
    {
        this.disposeRoomPlaylist();
    }

    private disposeRoomPlaylist(): void
    {
        if(this._roomItemPlaylist)
        {
            this._roomItemPlaylist.dispose();
            this._roomItemPlaylist = undefined;
        }
    }
}
