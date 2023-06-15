import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarExpressionUpdateMessage extends ObjectStateUpdateMessage {
  constructor(expressionType: number = 0) {
    super()

    this._expressionType = expressionType
  }

  private _expressionType: number

  public get expressionType(): number {
    return this._expressionType
  }
}
