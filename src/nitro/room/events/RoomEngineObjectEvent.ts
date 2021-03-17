import { RoomEngineEvent } from './RoomEngineEvent';

export class RoomEngineObjectEvent extends RoomEngineEvent
{
    public static SELECTED: string          = 'REOE_SELECTED';
    public static DESELECTED: string        = 'REOE_DESELECTED';
    public static ADDED: string             = 'REOE_ADDED';
    public static REMOVED: string           = 'REOE_REMOVED';
    public static PLACED: string            = 'REOE_PLACED';
    public static PLACED_ON_USER: string    = 'REOE_PLACED_ON_USER';
    public static CONTENT_UPDATED: string   = 'REOE_CONTENT_UPDATED';
    public static REQUEST_MOVE: string      = 'REOE_REQUEST_MOVE';
    public static REQUEST_ROTATE: string    = 'REOE_REQUEST_ROTATE';
    public static MOUSE_ENTER: string       = 'REOE_MOUSE_ENTER';
    public static MOUSE_LEAVE: string       = 'REOE_MOUSE_LEAVE';

    private _objectId: number;
    private _category: number;

    constructor(type: string, roomId: number, objectId: number, category: number)
    {
        super(type, roomId);

        this._objectId  = objectId;
        this._category  = category;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get category(): number
    {
        return this._category;
    }
}