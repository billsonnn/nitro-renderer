import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FriendCategoryData } from '@/nitro'
import { FriendParser } from '@/nitro'

export class FriendListUpdateParser implements IMessageParser {
  private _categories: FriendCategoryData[]

  public get categories(): FriendCategoryData[] {
    return this._categories
  }

  private _removedFriendIds: number[]

  public get removedFriendIds(): number[] {
    return this._removedFriendIds
  }

  private _addedFriends: FriendParser[]

  public get addedFriends(): FriendParser[] {
    return this._addedFriends
  }

  private _updatedFriends: FriendParser[]

  public get updatedFriends(): FriendParser[] {
    return this._updatedFriends
  }

  public flush(): boolean {
    this._categories = []
    this._removedFriendIds = []
    this._addedFriends = []
    this._updatedFriends = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalCategories = wrapper.readInt()

    while (totalCategories > 0) {
      this._categories.push(new FriendCategoryData(wrapper))

      totalCategories--
    }

    let totalUpdates = wrapper.readInt()

    while (totalUpdates > 0) {
      const type = wrapper.readInt()

      if (type === -1) {
        this._removedFriendIds.push(wrapper.readInt())
      } else if (type === 0) {
        this._updatedFriends.push(new FriendParser(wrapper))
      } else if (type === 1) {
        this._addedFriends.push(new FriendParser(wrapper))
      }

      totalUpdates--
    }

    return true
  }
}
