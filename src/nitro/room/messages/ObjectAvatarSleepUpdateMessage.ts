import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarSleepUpdateMessage extends ObjectStateUpdateMessage {
  constructor(isSleeping: boolean = false) {
    super()

    this._isSleeping = isSleeping
  }

  private _isSleeping: boolean

  public get isSleeping(): boolean {
    return this._isSleeping
  }
}
