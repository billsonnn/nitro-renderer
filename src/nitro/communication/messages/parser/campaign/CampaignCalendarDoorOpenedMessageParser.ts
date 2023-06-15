import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CampaignCalendarDoorOpenedMessageParser implements IMessageParser {
  private _doorOpened: boolean

  public get doorOpened(): boolean {
    return this._doorOpened
  }

  private _productName: string

  public get productName(): string {
    return this._productName
  }

  private _customImage: string

  public get customImage(): string {
    return this._customImage
  }

  private _furnitureClassName: string

  public get furnitureClassName(): string {
    return this._furnitureClassName
  }

  public flush(): boolean {
    this._doorOpened = false
    this._productName = null
    this._customImage = null
    this._furnitureClassName = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._doorOpened = wrapper.readBoolean()
    this._productName = wrapper.readString()
    this._customImage = wrapper.readString()
    this._furnitureClassName = wrapper.readString()

    return true
  }
}
