import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PresentOpenedMessageParser implements IMessageParser {
  private _itemType: string

  public get itemType(): string {
    return this._itemType
  }

  private _classId: number

  public get classId(): number {
    return this._classId
  }

  private _productCode: string

  public get productCode(): string {
    return this._productCode
  }

  private _placedItemId: number

  public get placedItemId(): number {
    return this._placedItemId
  }

  private _placedItemType: string

  public get placedItemType(): string {
    return this._placedItemType
  }

  private _placedInRoom: boolean

  public get placedInRoom(): boolean {
    return this._placedInRoom
  }

  private _petFigureString: string

  public get petFigureString(): string {
    return this._petFigureString
  }

  public flush(): boolean {
    this._itemType = ''
    this._classId = 0
    this._productCode = ''

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemType = wrapper.readString()
    this._classId = wrapper.readInt()
    this._productCode = wrapper.readString()
    this._placedItemId = wrapper.readInt()
    this._placedItemType = wrapper.readString()
    this._placedInRoom = wrapper.readBoolean()
    this._petFigureString = wrapper.readString()
    return true
  }
}
