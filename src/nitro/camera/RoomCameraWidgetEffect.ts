import { Texture } from 'pixi.js';
import { IRoomCameraWidgetEffect } from './IRoomCameraWidgetEffect';

export class RoomCameraWidgetEffect implements IRoomCameraWidgetEffect
{
    private _name: string;
    private _minLevel: number = -1;
    private _texture: Texture = null;
    private _colorMatrix: number[] = null;
    private _blendMode: number = null;

    constructor(name: string, minLevel: number = -1, texture: Texture = null, colorMatrix: number[] = null, blendMode: number = null)
    {
        this._name          = name;
        this._minLevel      = minLevel;
        this._texture       = texture;
        this._colorMatrix   = colorMatrix;
        this._blendMode     = blendMode;
    }

    public get name(): string
    {
        return this._name;
    }

    public get texture(): Texture
    {
        return this._texture;
    }

    public set texture(texture: Texture)
    {
        this._texture = texture;
    }

    public get colorMatrix(): number[]
    {
        return this._colorMatrix;
    }

    public set colorMatrix(colorMatrix: number[])
    {
        this._colorMatrix = colorMatrix;
    }

    public get blendMode(): number
    {
        return this._blendMode;
    }

    public set blendMode(blendMode: number)
    {
        this._blendMode = blendMode;
    }

    public get minLevel(): number
    {
        return this._minLevel;
    }
}
