import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarGestureUpdateMessage extends ObjectStateUpdateMessage {
  constructor(gesture: number = 0) {
    super()

    this._gesture = gesture
  }

  private _gesture: number

  public get gesture(): number {
    return this._gesture
  }
}
