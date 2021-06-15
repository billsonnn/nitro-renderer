import { RoomCameraWidgetEditorEffect } from './RoomCameraWidgetEditorEffect';
export class RoomCameraWidgetEditorSelectedEffect
{
    private _effect: RoomCameraWidgetEditorEffect;
    private _alpha: number;

    constructor(effect: RoomCameraWidgetEditorEffect, alpha: number)
    {
        this._effect    = effect;
        this._alpha     = alpha;
    }

    public get effect(): RoomCameraWidgetEditorEffect
    {
        return this._effect;
    }

    public get alpha(): number
    {
        return this._alpha;
    }
}
