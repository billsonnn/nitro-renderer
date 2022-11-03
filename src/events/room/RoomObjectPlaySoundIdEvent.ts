import { IRoomObject } from '../../api';
import { RoomObjectFurnitureActionEvent } from './RoomObjectFurnitureActionEvent';

export class RoomObjectPlaySoundIdEvent extends RoomObjectFurnitureActionEvent
{
    public static PLAY_SOUND: string = 'ROPSIE_PLAY_SOUND';
    public static PLAY_SOUND_AT_PITCH: string = 'ROPSIE_PLAY_SOUND_AT_PITCH';

    private _soundId: string;
    private _pitch: number;

    constructor(type: string, object: IRoomObject, soundId: string, pitch: number = 1)
    {
        super(type, object);

        this._soundId = soundId;
        this._pitch = pitch;
    }

    public get soundId(): string
    {
        return this._soundId;
    }

    public get pitch(): number
    {
        return this._pitch;
    }
}
