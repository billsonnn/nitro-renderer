import { NitroEvent } from '../../../core/events/NitroEvent';

export class RoomCameraWidgetManagerEvent extends NitroEvent
{
    public static INITIALIZED: string = 'RCWM_INITIALIZED';

    constructor(type: string)
    {
        super(type);
    }
}
