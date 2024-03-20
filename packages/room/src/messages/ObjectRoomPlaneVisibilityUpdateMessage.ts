import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomPlaneVisibilityUpdateMessage extends RoomObjectUpdateMessage
{
    public static WALL_VISIBILITY: string = 'RORPVUM_WALL_VISIBILITY';
    public static FLOOR_VISIBILITY: string = 'RORPVUM_FLOOR_VISIBILITY';

    private _type: string;
    private _visible: boolean;

    constructor(type: string, visible: boolean)
    {
        super(null, null);

        this._type = type;
        this._visible = visible;
    }

    public get type(): string
    {
        return this._type;
    }

    public get visible(): boolean
    {
        return this._visible;
    }
}
