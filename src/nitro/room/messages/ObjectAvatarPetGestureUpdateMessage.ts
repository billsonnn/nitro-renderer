import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarPetGestureUpdateMessage extends ObjectStateUpdateMessage {
  constructor(gesture: string) {
    super()

    this._gesture = gesture
  }

  private _gesture: string

  public get gesture(): string {
    return this._gesture
  }
}
