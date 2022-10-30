import { IRoomSpriteMouseEvent } from '../../api';

export class RoomSpriteMouseEvent implements IRoomSpriteMouseEvent
{
    private _type: string;
    private _eventId: string;
    private _canvasId: string;
    private _spriteTag: string;
    private _screenX: number;
    private _screenY: number;
    private _localX: number;
    private _localY: number;
    private _ctrlKey: boolean;
    private _altKey: boolean;
    private _shiftKey: boolean;
    private _buttonDown: boolean;
    private _spriteOffsetX: number;
    private _spriteOffsetY: number;

    constructor(type: string, eventId: string, canvasId: string, spriteTag: string, screenX: number, screenY: number, localX: number = 0, localY: number = 0, ctrlKey: boolean = false, altKey: boolean = false, shiftKey: boolean = false, buttonDown: boolean = false)
    {
        this._type = type;
        this._eventId = eventId;
        this._canvasId = canvasId;
        this._spriteTag = spriteTag;
        this._screenX = screenX;
        this._screenY = screenY;
        this._localX = localX;
        this._localY = localY;
        this._ctrlKey = ctrlKey;
        this._altKey = altKey;
        this._shiftKey = shiftKey;
        this._buttonDown = buttonDown;
        this._spriteOffsetX = 0;
        this._spriteOffsetY = 0;
    }

    public get type(): string
    {
        return this._type;
    }

    public get eventId(): string
    {
        return this._eventId;
    }

    public get canvasId(): string
    {
        return this._canvasId;
    }

    public get spriteTag(): string
    {
        return this._spriteTag;
    }

    public get screenX(): number
    {
        return this._screenX;
    }

    public get screenY(): number
    {
        return this._screenY;
    }

    public get localX(): number
    {
        return this._localX;
    }

    public get localY(): number
    {
        return this._localY;
    }

    public get ctrlKey(): boolean
    {
        return this._ctrlKey;
    }

    public get altKey(): boolean
    {
        return this._altKey;
    }

    public get shiftKey(): boolean
    {
        return this._shiftKey;
    }

    public get buttonDown(): boolean
    {
        return this._buttonDown;
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
