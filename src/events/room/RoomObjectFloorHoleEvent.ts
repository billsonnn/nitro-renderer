﻿import { IRoomObject } from '@/api';
import { RoomObjectEvent } from '@/events';

export class RoomObjectFloorHoleEvent extends RoomObjectEvent
{
    public static ADD_HOLE: string = 'ROFHO_ADD_HOLE';
    public static REMOVE_HOLE: string = 'ROFHO_REMOVE_HOLE';

    constructor(k: string, _arg_2: IRoomObject)
    {
        super(k, _arg_2);
    }
}
