import { RoomEngineObjectEvent } from './RoomEngineObjectEvent';

export class RoomEngineSamplePlaybackEvent extends RoomEngineObjectEvent
{
    public static ROOM_OBJECT_INITIALIZED: string = 'ROPSPE_ROOM_OBJECT_INITIALIZED';
    public static ROOM_OBJECT_DISPOSED: string = 'ROPSPE_ROOM_OBJECT_DISPOSED';
    public static PLAY_SAMPLE: string = 'ROPSPE_PLAY_SAMPLE';
    public static CHANGE_PITCH: string = 'ROPSPE_CHANGE_PITCH';

    private _sampleId: number;
    private _pitch: number;

    constructor(k: string, roomId: number, objectId: number, objectCategory: number, sampleId: number, pitch: number = 1)
    {
        super(k, roomId, objectId, objectCategory);

        this._sampleId = sampleId;
        this._pitch = pitch;
    }

    public get sampleId(): number
    {
        return this._sampleId;
    }

    public get pitch(): number
    {
        return this._pitch;
    }
}
