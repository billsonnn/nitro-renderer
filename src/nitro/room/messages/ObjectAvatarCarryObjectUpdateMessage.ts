import { ObjectStateUpdateMessage } from '@/nitro'

export class ObjectAvatarCarryObjectUpdateMessage extends ObjectStateUpdateMessage {
  constructor(itemType: number, itemName: string) {
    super()

    this._itemType = itemType
    this._itemName = itemName
  }

  private _itemType: number

  public get itemType(): number {
    return this._itemType
  }

  private _itemName: string

  public get itemName(): string {
    return this._itemName
  }
}
