import { IVector3D } from '@nitrots/api';
import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectTileCursorUpdateMessage extends RoomObjectUpdateMessage
{
    private _height: number;
    private _sourceEventId: string;
    private _visible: boolean;
    private _toggleVisibility: boolean;

    constructor(k: IVector3D, height: number, visible: boolean, sourceEventId: string, toggleVisibility: boolean = false)
    {
        super(k, null);

        this._height = height;
        this._visible = visible;
        this._sourceEventId = sourceEventId;
        this._toggleVisibility = toggleVisibility;
    }

    public get height(): number
    {
        return this._height;
    }

    public get visible(): boolean
    {
        return this._visible;
    }

    public get sourceEventId(): string
    {
        return this._sourceEventId;
    }

    public get toggleVisibility(): boolean
    {
        return this._toggleVisibility;
    }
}
