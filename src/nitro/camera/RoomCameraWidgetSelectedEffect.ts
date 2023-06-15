import { IRoomCameraWidgetEffect } from '@/api'

export class RoomCameraWidgetSelectedEffect {
  constructor(effect: IRoomCameraWidgetEffect, alpha: number) {
    this._effect = effect
    this._alpha = alpha
  }

  private _effect: IRoomCameraWidgetEffect

  public get effect(): IRoomCameraWidgetEffect {
    return this._effect
  }

  private _alpha: number

  public get alpha(): number {
    return this._alpha
  }
}
