import { IMessageDataWrapper } from '@/api'

export class PromoArticleData {
  public static readonly LINK_TYPE_URL = 0
  public static readonly LINK_TYPE_INTERNAL = 1
  public static readonly LINK_TYPE_NO_LINK = 2

  constructor(k: IMessageDataWrapper) {
    this._id = k.readInt()
    this._title = k.readString()
    this._bodyText = k.readString()
    this._buttonText = k.readString()
    this._linkType = k.readInt()
    this._linkContent = k.readString()
    this._imageUrl = k.readString()
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _title: string

  public get title(): string {
    return this._title
  }

  private _bodyText: string

  public get bodyText(): string {
    return this._bodyText
  }

  private _buttonText: string

  public get buttonText(): string {
    return this._buttonText
  }

  private _linkType: number

  public get linkType(): number {
    return this._linkType
  }

  private _linkContent: string

  public get linkContent(): string {
    return this._linkContent
  }

  private _imageUrl: string

  public get imageUrl(): string {
    return this._imageUrl
  }
}
