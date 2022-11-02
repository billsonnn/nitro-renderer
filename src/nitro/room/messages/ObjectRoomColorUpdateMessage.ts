import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectRoomColorUpdateMessage extends RoomObjectUpdateMessage
{
    public static BACKGROUND_COLOR: string = 'RORCUM_BACKGROUND_COLOR';

    private _type: string;
    private _color: number;
    private _light: number;
    private _backgroundOnly: boolean;

    constructor(type: string, color: number, light: number, backgroundOnly: boolean)
    {
        super(null, null);

        this._type = type;
        this._color = color;
        this._light = light;
        this._backgroundOnly = backgroundOnly;
    }

    public get type(): string
    {
        return this._type;
    }

    public get color(): number
    {
        return this._color;
    }

    public get light(): number
    {
        return this._light;
    }

    public get backgroundOnly(): boolean
    {
        return this._backgroundOnly;
    }
}
