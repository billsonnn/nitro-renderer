import { IRoomCameraWidgetEffect } from '@nitrots/api';

export class RoomCameraWidgetSelectedEffect
{
    private _effect: IRoomCameraWidgetEffect;
    private _strength: number;

    constructor(effect: IRoomCameraWidgetEffect, strength: number)
    {
        this._effect = effect;
        this._strength = strength;
    }

    public get effect(): IRoomCameraWidgetEffect
    {
        return this._effect;
    }

    public get strength(): number
    {
        return this._strength;
    }
}
