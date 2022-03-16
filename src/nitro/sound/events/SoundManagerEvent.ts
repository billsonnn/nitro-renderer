import { NitroEvent } from '../../../core/events/NitroEvent';

export class SoundManagerEvent extends NitroEvent
{
    public static TRAX_SONG_COMPLETE: string = 'SME_TRAX_SONG_COMPLETE';

    constructor(type: string)
    {
        super(type);
    }
}
