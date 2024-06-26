import { ISongInfo } from '@nitrots/api';

export class SongDataEntry implements ISongInfo
{
    private _jukeboxDiskId:number = -1;

    constructor(
        public readonly id: number,
        public readonly length: number,
        public readonly name: string,
        public readonly creator: string,
        public readonly songData: string = ''
    )
    {}

    public get diskId(): number
    {
        return this._jukeboxDiskId;
    }

    public set diskId(k: number)
    {
        this._jukeboxDiskId = k;
    }
}
