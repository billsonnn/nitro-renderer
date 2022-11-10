import { IRoomObject } from '../../api';
import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectMouseEvent extends RoomObjectEvent
{
    public static CLICK: string = 'ROE_MOUSE_CLICK';
    public static DOUBLE_CLICK: string = 'ROE_MOUSE_DOUBLE_CLICK';
    public static MOUSE_MOVE: string = 'ROE_MOUSE_MOVE';
    public static MOUSE_DOWN: string = 'ROE_MOUSE_DOWN';
    public static MOUSE_DOWN_LONG: string = 'ROE_MOUSE_DOWN_LONG';
    public static MOUSE_UP: string = 'ROE_MOUSE_UP';
    public static MOUSE_ENTER: string = 'ROE_MOUSE_ENTER';
    public static MOUSE_LEAVE: string = 'ROE_MOUSE_LEAVE';

    private _eventId: string = '';
    private _altKey: boolean;
    private _ctrlKey: boolean;
    private _shiftKey: boolean;
    private _buttonDown: boolean;
    private _localX: number;
    private _localY: number;
    private _spriteOffsetX: number;
    private _spriteOffsetY: number;

    constructor(type: string, object: IRoomObject, eventId: string, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false, buttonDown: boolean = false)
    {
        super(type, object);

        this._eventId = eventId;
        this._altKey = altKey;
        this._ctrlKey = ctrlKey;
        this._shiftKey = shiftKey;
        this._buttonDown = buttonDown;
    }

    public get eventId(): string
    {
        return this._eventId;
    }

    public get altKey(): boolean
    {
        return this._altKey;
    }

    public get ctrlKey(): boolean
    {
        return this._ctrlKey;
    }

    public get shiftKey(): boolean
    {
        return this._shiftKey;
    }

    public get buttonDown(): boolean
    {
        return this._buttonDown;
    }

    public get localX(): number
    {
        return this._localX;
    }

    public set localX(k: number)
    {
        this._localX = k;
    }

    public get localY(): number
    {
        return this._localY;
    }

    public set localY(k: number)
    {
        this._localY = k;
    }

    public get spriteOffsetX(): number
    {
        return this._spriteOffsetX;
    }

    public set spriteOffsetX(k: number)
    {
        this._spriteOffsetX = k;
    }

    public get spriteOffsetY(): number
    {
        return this._spriteOffsetY;
    }

    public set spriteOffsetY(k: number)
    {
        this._spriteOffsetY = k;
    }
}
