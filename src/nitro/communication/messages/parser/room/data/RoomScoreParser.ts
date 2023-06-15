import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomScoreParser implements IMessageParser {
  private _totalLikes: number

  public get totalLikes(): number {
    return this._totalLikes
  }

  private _canLike: boolean

  public get canLike(): boolean {
    return this._canLike
  }

  public flush(): boolean {
    this._totalLikes = 0
    this._canLike = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._totalLikes = wrapper.readInt()
    this._canLike = wrapper.readBoolean()

    return true
  }
}
