import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarChatUpdateMessage extends ObjectStateUpdateMessage {
  constructor(numberOfWords: number = 0) {
    super()

    this._numberOfWords = numberOfWords
  }

  private _numberOfWords: number

  public get numberOfWords(): number {
    return this._numberOfWords
  }
}
