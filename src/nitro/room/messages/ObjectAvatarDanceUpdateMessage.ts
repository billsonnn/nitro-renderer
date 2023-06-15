import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarDanceUpdateMessage extends ObjectStateUpdateMessage {
  constructor(danceStyle: number = 0) {
    super()

    this._danceStyle = danceStyle
  }

  private _danceStyle: number

  public get danceStyle(): number {
    return this._danceStyle
  }
}
