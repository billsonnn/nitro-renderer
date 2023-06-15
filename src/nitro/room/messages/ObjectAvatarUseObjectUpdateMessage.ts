import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarUseObjectUpdateMessage extends ObjectStateUpdateMessage {
  constructor(itemType: number) {
    super()

    this._itemType = itemType
  }

  private _itemType: number

  public get itemType(): number {
    return this._itemType
  }
}
