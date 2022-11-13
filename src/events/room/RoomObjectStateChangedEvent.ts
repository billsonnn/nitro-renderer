import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectStateChangedEvent extends RoomObjectEvent
{
    public static STATE_CHANGE: string = 'ROSCE_STATE_CHANGE';
    public static STATE_RANDOM: string = 'ROSCE_STATE_RANDOM';

    private _state: number;

    constructor(type: string, object: IRoomObject, state: number = 0)
    {
        super(type, object);

        this._state = state;
    }

    public get state(): number
    {
        return this._state;
    }
}
