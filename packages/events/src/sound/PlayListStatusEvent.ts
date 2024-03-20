import { NitroEvent } from '@nitrots/events';

export class PlayListStatusEvent extends NitroEvent
{
    public static readonly PLUE_PLAY_LIST_UPDATED = 'PLUE_PLAY_LIST_UPDATED';
    public static readonly PLUE_PLAY_LIST_FULL = 'PLUE_PLAY_LIST_FULL';

    constructor(k:string)
    {
        super(k);
    }
}
