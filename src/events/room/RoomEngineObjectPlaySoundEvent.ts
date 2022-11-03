import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineObjectPlaySoundEvent extends RoomEngineObjectEvent
{
    public static PLAY_SOUND: string = 'REOPSE_PLAY_SOUND';
    public static PLAY_SOUND_AT_PITCH: string = 'REOPSE_PLAY_SOUND_AT_PITCH';

    private _soundId: string;
    private _pitch: number;

    constructor(type: string, roomId: number, objectId: number, objectCategory: number, soundId: string, pitch: number = 1)
    {
        super(type, roomId, objectId, objectCategory);

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
