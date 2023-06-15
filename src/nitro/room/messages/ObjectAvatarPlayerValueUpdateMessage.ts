import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarPlayerValueUpdateMessage extends ObjectStateUpdateMessage {
  constructor(value: number) {
    super()

    this._value = value
  }

  private _value: number

  public get value(): number {
    return this._value
  }
}
