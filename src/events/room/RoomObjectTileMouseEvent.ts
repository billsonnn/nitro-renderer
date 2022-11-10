import { IRoomObject } from '../../api';
import { RoomObjectMouseEvent } from './RoomObjectMouseEvent';

export class RoomObjectTileMouseEvent extends RoomObjectMouseEvent
{
    private _tileX: number;
    private _tileY: number;
    private _tileZ: number;

    constructor(type: string, object: IRoomObject, eventId: string, tileX: number, tileY: number, tileZ: number, altKey: boolean = false, ctrlKey: boolean = false, shiftKey: boolean = false, buttonDown: boolean = false)
    {
        super(type, object, eventId, altKey, ctrlKey, shiftKey, buttonDown);

        this._tileX = tileX;
        this._tileY = tileY;
        this._tileZ = tileZ;
    }

    public get tileX(): number
    {
        return this._tileX;
    }

    public get tileY(): number
    {
        return this._tileY;
    }

    public get tileZ(): number
    {
        return this._tileZ;
    }

    public get tileXAsInt(): number
    {
        return Math.trunc(this._tileX + 0.499);
    }

    public get tileYAsInt(): number
    {
        return Math.trunc(this._tileY + 0.499);
    }

    public get tileZAsInt(): number
    {
        return Math.trunc(this._tileZ + 0.499);
    }
}
