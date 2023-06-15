import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FriendCategoryData } from '@/nitro'

export class MessengerInitParser implements IMessageParser {
  private _userFriendLimit: number

  public get userFriendLimit(): number {
    return this._userFriendLimit
  }

  private _normalFriendLimit: number

  public get normalFriendLimit(): number {
    return this._normalFriendLimit
  }

  private _extendedFriendLimit: number

  public get extendedFriendLimit(): number {
    return this._extendedFriendLimit
  }

  private _categories: FriendCategoryData[]

  public get categories(): FriendCategoryData[] {
    return this._categories
  }

  public flush(): boolean {
    this._userFriendLimit = 0
    this._normalFriendLimit = 0
    this._extendedFriendLimit = 0
    this._categories = []
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._userFriendLimit = wrapper.readInt()
    this._normalFriendLimit = wrapper.readInt()
    this._extendedFriendLimit = wrapper.readInt()

    let totalCategories = wrapper.readInt()

    while (totalCategories > 0) {
      this._categories.push(new FriendCategoryData(wrapper))

      totalCategories--
    }

    return true
  }
}
