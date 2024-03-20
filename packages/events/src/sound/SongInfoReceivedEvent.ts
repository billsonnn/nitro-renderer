import { NitroEvent } from '@nitrots/events';

export class SongInfoReceivedEvent extends NitroEvent
{
    public static readonly SIR_TRAX_SONG_INFO_RECEIVED = 'SIR_TRAX_SONG_INFO_RECEIVED';

    private _id:number;

    constructor(k:string, _arg_2:number)
    {
        super(k);
        this._id = _arg_2;
    }

    public get id():number
    {
        return this._id;
    }
}
