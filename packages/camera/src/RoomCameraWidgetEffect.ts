import { IRoomCameraWidgetEffect } from '@nitrots/api';
import { BLEND_MODES, ColorMatrix, Texture } from 'pixi.js';

export class RoomCameraWidgetEffect implements IRoomCameraWidgetEffect
{
    private _name: string;
    private _minLevel: number = -1;
    private _texture: Texture = null;
    private _colorMatrix: ColorMatrix = null;
    private _blendMode: BLEND_MODES = null;

    constructor(name: string, minLevel: number = -1, texture: Texture = null, colorMatrix: ColorMatrix = null, blendMode: BLEND_MODES = null)
    {
        this._name = name;
        this._minLevel = minLevel;
        this._texture = texture;
        this._colorMatrix = colorMatrix;
        this._blendMode = blendMode;
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

    public get colorMatrix(): ColorMatrix
    {
        return this._colorMatrix;
    }

    public set colorMatrix(colorMatrix: ColorMatrix)
    {
        this._colorMatrix = colorMatrix;
    }

    public get blendMode(): BLEND_MODES
    {
        return this._blendMode;
    }

    public set blendMode(blendMode: BLEND_MODES)
    {
        this._blendMode = blendMode;
    }

    public get minLevel(): number
    {
        return this._minLevel;
    }
}
