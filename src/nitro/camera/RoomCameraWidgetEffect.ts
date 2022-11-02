import { Resource, Texture } from '@pixi/core';
import { ColorMatrix } from '@pixi/filter-color-matrix';
import { IRoomCameraWidgetEffect } from '../../api';

export class RoomCameraWidgetEffect implements IRoomCameraWidgetEffect
{
    private _name: string;
    private _minLevel: number = -1;
    private _texture: Texture<Resource> = null;
    private _colorMatrix: ColorMatrix = null;
    private _blendMode: number = null;

    constructor(name: string, minLevel: number = -1, texture: Texture<Resource> = null, colorMatrix: ColorMatrix = null, blendMode: number = null)
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

    public get texture(): Texture<Resource>
    {
        return this._texture;
    }

    public set texture(texture: Texture<Resource>)
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
