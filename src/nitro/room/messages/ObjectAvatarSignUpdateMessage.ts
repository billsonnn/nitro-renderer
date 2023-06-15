import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarSignUpdateMessage extends ObjectStateUpdateMessage {
  constructor(signType: number = 0) {
    super()

    this._signType = signType
  }

  private _signType: number

  public get signType(): number {
    return this._signType
  }
}
