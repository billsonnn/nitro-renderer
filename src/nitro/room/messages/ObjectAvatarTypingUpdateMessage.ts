import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarTypingUpdateMessage extends ObjectStateUpdateMessage {
  constructor(isTyping: boolean = false) {
    super()

    this._isTyping = isTyping
  }

  private _isTyping: boolean

  public get isTyping(): boolean {
    return this._isTyping
  }
}
