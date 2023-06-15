import { IMessageDataWrapper, IMessageParser } from '@/api'

export class BuildersClubSubscriptionStatusMessageParser implements IMessageParser {
  private _secondsLeft: number

  public get secondsLeft(): number {
    return this._secondsLeft
  }

  private _furniLimit: number

  public get furniLimit(): number {
    return this._furniLimit
  }

  private _maxFurniLimit: number

  public get maxFurniLimit(): number {
    return this._maxFurniLimit
  }

  private _secondsLeftWithGrace: number

  public get secondsLeftWithGrace(): number {
    return this._secondsLeftWithGrace
  }

  public flush(): boolean {
    this._secondsLeft = 0
    this._furniLimit = 0
    this._maxFurniLimit = 0
    this._secondsLeftWithGrace = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._secondsLeft = wrapper.readInt()
    this._furniLimit = wrapper.readInt()
    this._maxFurniLimit = wrapper.readInt()

    if (wrapper.bytesAvailable) this._secondsLeftWithGrace = wrapper.readInt()
    else this._secondsLeftWithGrace = this._secondsLeft

    return true
  }
}
