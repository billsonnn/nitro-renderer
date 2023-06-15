import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomPaintParser implements IMessageParser {
  private _floorType: string

  public get floorType(): string {
    return this._floorType
  }

  private _wallType: string

  public get wallType(): string {
    return this._wallType
  }

  private _landscapeType: string

  public get landscapeType(): string {
    return this._landscapeType
  }

  private _landscapeAnimation: string

  public get landscapeAnimation(): string {
    return this._landscapeAnimation
  }

  public flush(): boolean {
    this._floorType = null
    this._wallType = null
    this._landscapeType = null
    this._landscapeAnimation = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    const type = wrapper.readString()
    const value = wrapper.readString()

    switch (type) {
      case 'floor':
        this._floorType = value
        break
      case 'wallpaper':
        this._wallType = value
        break
      case 'landscape':
        this._landscapeType = value
        break
      case 'landscapeanim':
        this._landscapeAnimation = value
        break
    }

    return true
  }
}
