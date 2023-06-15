import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarGuideStatusUpdateMessage extends ObjectStateUpdateMessage {
  constructor(value: number) {
    super()

    this._guideStatus = value
  }

  private _guideStatus: number

  public get guideStatus(): number {
    return this._guideStatus
  }
}
