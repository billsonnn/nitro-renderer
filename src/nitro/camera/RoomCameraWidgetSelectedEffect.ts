import { IRoomCameraWidgetEffect } from '../../api';

export class RoomCameraWidgetSelectedEffect
{
    private _effect: IRoomCameraWidgetEffect;
    private _alpha: number;

    constructor(effect: IRoomCameraWidgetEffect, alpha: number)
    {
        this._effect = effect;
        this._alpha = alpha;
    }

    public get effect(): IRoomCameraWidgetEffect
    {
        return this._effect;
    }

    public get alpha(): number
    {
        return this._alpha;
    }
}
