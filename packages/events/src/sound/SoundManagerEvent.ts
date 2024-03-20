import { NitroEvent } from '@nitrots/events';

export class SoundManagerEvent extends NitroEvent
{
    public static TRAX_SONG_COMPLETE: string = 'SME_TRAX_SONG_COMPLETE';

    private _id: number;

    constructor(type: string, id: number)
    {
        super(type);
        this._id = id;
    }

    public get id(): number
    {
        return this._id;
    }
}
