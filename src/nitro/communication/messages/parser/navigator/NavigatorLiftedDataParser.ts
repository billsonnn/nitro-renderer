import { IMessageDataWrapper } from '@/api'

export class NavigatorLiftedDataParser {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _roomId: number

  public get roomId(): number {
    return this._roomId
  }

  private _areaId: number

  public get areaId(): number {
    return this._areaId
  }

  private _image: string

  public get image(): string {
    return this._image
  }

  private _caption: string

  public get caption(): string {
    return this._caption
  }

  public flush(): boolean {
    this._roomId = -1
    this._areaId = -1
    this._image = null
    this._caption = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._roomId = wrapper.readInt()
    this._areaId = wrapper.readInt()
    this._image = wrapper.readString()
    this._caption = wrapper.readString()

    return true
  }
}
