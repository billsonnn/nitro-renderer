import { NitroEvent } from '../../../events';

export class SongDiskInventoryReceivedEvent extends NitroEvent
{
    public static readonly SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT = 'SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT';

    constructor(k:string)
    {
        super(k);
    }
}
