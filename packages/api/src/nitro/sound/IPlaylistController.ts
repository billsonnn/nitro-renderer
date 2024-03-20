import { ISongInfo } from './ISongInfo';

export interface IPlaylistController
{
    init(): void;
    dispose(): void;
    stopPlaying(): void;
    getEntry(index: number): ISongInfo;
    requestPlayList(): void;
    get priority(): number;
    get length(): number;
    get playPosition(): number;
    get currentSongId(): number;
    get isPlaying(): boolean;
    get entries(): ISongInfo[];
}
