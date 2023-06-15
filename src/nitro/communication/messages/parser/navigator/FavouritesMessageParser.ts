import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FavouritesMessageParser implements IMessageParser {
  private _favouriteRoomIds: number[]

  private _limit: number

  public get limit(): number {
    return this._limit
  }

  public get favoriteRoomIds(): number[] {
    return this._favouriteRoomIds
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._favouriteRoomIds = []
    this._limit = wrapper.readInt()

    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._favouriteRoomIds.push(wrapper.readInt())
    }

    return true
  }
}
