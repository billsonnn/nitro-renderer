import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarFlatControlUpdateMessage extends ObjectStateUpdateMessage {
  constructor(level: number = 0) {
    super()

    this._level = level
  }

  private _level: number

  public get level(): number {
    return this._level
  }
}
