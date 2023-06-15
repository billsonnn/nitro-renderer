import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CatalogPageWithEarliestExpiryMessageParser implements IMessageParser {
  private _pageName: string

  public get pageName(): string {
    return this._pageName
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
    this._secondsToExpiry = 0
    this._image = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._pageName = wrapper.readString()
    this._secondsToExpiry = wrapper.readInt()
    this._image = wrapper.readString()

    return true
  }
}
