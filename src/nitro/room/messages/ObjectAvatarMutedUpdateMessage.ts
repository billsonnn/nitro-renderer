import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarMutedUpdateMessage extends ObjectStateUpdateMessage {
  constructor(isMuted: boolean = false) {
    super()

    this._isMuted = isMuted
  }

  private _isMuted: boolean

  public get isMuted(): boolean {
    return this._isMuted
  }
}
