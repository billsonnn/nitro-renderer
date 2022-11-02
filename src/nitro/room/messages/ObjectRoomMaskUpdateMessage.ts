import { IVector3D, Vector3d } from '../../../api';
import { RoomObjectUpdateMessage } from '../../../room';

export class ObjectRoomMaskUpdateMessage extends RoomObjectUpdateMessage
{
    public static ADD_MASK: string = 'RORMUM_ADD_MASK';
    public static REMOVE_MASK: string = 'RORMUM_ADD_MASK';
    public static DOOR: string = 'door';
    public static WINDOW: string = 'window';
    public static HOLE: string = 'hole';

    private _type: string;
    private _maskId: string;
    private _maskType: string;
    private _maskLocation: Vector3d;
    private _maskCategory: string;

    constructor(type: string, maskId: string, maskType: string = null, maskLocation: IVector3D = null, maskCategory: string = 'window')
    {
        super(null, null);

        this._type = type;
        this._maskId = maskId;
        this._maskType = maskType;
        this._maskLocation = maskLocation ? new Vector3d(maskLocation.x, maskLocation.y, maskLocation.z) : null;
        this._maskCategory = maskCategory;
    }

    public get type(): string
    {
        return this._type;
    }

    public get maskId(): string
    {
        return this._maskId;
    }

    public get maskType(): string
    {
        return this._maskType;
    }

    public get maskLocation(): IVector3D
    {
        return this._maskLocation;
    }

    public get maskCategory(): string
    {
        return this._maskCategory;
    }
}
