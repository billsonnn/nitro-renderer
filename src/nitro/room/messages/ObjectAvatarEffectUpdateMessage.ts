import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarEffectUpdateMessage extends ObjectStateUpdateMessage {
  constructor(effect: number, delayMilliseconds: number = 0) {
    super()

    this._effect = effect
    this._delayMilliseconds = delayMilliseconds
  }

  private _effect: number

  public get effect(): number {
    return this._effect
  }

  private _delayMilliseconds: number

  public get delayMilliseconds(): number {
    return this._delayMilliseconds
  }
}
