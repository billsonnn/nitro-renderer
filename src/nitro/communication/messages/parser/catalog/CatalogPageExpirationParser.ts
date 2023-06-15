import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CatalogPageExpirationParser implements IMessageParser {
  private _pageName: string

  public get pageName(): string {
    return this._pageName
  }

  private _pageId: number

  public get pageId(): number {
    return this._pageId
  }

  private _secondsToExpiry: number

  public get secondsToExpiry(): number {
    return this._secondsToExpiry
  }

  private _image: string

  public get image(): string {
    return this._image
  }

  public flush(): boolean {
    this._pageName = null
    this._pageId = 0
    this._secondsToExpiry = 0
    this._image = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._pageId = wrapper.readInt()
    this._pageName = wrapper.readString()
    this._secondsToExpiry = wrapper.readInt()
    this._image = wrapper.readString()

    return true
  }
}
