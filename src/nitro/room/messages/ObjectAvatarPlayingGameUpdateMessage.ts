import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarPlayingGameUpdateMessage extends ObjectStateUpdateMessage {
  constructor(flag: boolean) {
    super()

    this._isPlayingGame = flag
  }

  private _isPlayingGame: boolean

  public get isPlayingGame(): boolean {
    return this._isPlayingGame
  }
}
