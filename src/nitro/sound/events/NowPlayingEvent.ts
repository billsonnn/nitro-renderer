import { NitroEvent } from '../../../events';

export class NowPlayingEvent extends NitroEvent
{
    public static readonly NPE_USER_PLAY_SONG = 'NPE_USER_PLAY_SONG';
    public static readonly NPW_USER_STOP_SONG = 'NPW_USER_STOP_SONG';
    public static readonly NPE_SONG_CHANGED = 'NPE_SONG_CHANGED';

    private _id:number;
    private _position:number;
    private _priority:number;

    constructor(k:string, priority:number, id:number, position:number)
    {
        super(k);
        this._id = id;
        this._position = position;
        this._priority = priority;
    }

    public get id():number
    {
        return this._id;
    }

    public get position():number
    {
        return this._position;
    }

    public get priority():number
    {
        return this._priority;
    }
}
