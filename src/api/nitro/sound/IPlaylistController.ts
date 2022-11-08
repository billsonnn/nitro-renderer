import { ISongInfo } from './common/ISongInfo';

export interface IPlaylistController
{
    get priority():number;
    get length():number;
    get playPosition():number;
    get nowPlayingSongId():number;
    get isPlaying():boolean;
    get entries(): ISongInfo[];
    getEntry(_arg_1: number):ISongInfo;
    requestPlayList():void;
    init(): void;
    dispose():void;
}
