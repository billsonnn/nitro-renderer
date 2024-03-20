import { IAdvancedMap } from '../../utils';
import { IPlaylistController } from './IPlaylistController';
import { ISongInfo } from './ISongInfo';

export interface IMusicController
{
    getRoomItemPlaylist(_arg_1?: number): IPlaylistController;
    getSongDiskInventorySize(): number;
    getSongDiskInventoryDiskId(_arg_1: number): number;
    getSongDiskInventorySongId(_arg_1: number): number;
    getSongInfo(songId: number): ISongInfo;
    getSongIdPlayingAtPriority(_arg_1: number): number;
    playSong(songId: number, priority: number, startPos?: number, playLength?: number, fadeInSeconds?: number, fadeOutSeconds?: number): boolean;
    stop(priority: number): void;
    addSongInfoRequest(_arg_1: number): void;
    requestSongInfoWithoutSamples(_arg_1: number): void;
    requestUserSongDisks(): void;
    onSongLoaded(_arg_1: number): void;
    updateVolume(_arg_1: number): void;
    samplesUnloaded(_arg_1: number[]): void;
    get samplesIdsInUse(): number[];
    get songDiskInventory(): IAdvancedMap<number, number>
    init(): void;
    dispose(): void;
}
