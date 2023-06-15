import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarPostureUpdateMessage extends ObjectStateUpdateMessage {
  constructor(postureType: string, parameter: string = '') {
    super()

    this._postureType = postureType
    this._parameter = parameter
  }

  private _postureType: string

  public get postureType(): string {
    return this._postureType
  }

  private _parameter: string

  public get parameter(): string {
    return this._parameter
  }
}
