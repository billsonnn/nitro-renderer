import { IMessageDataWrapper, IMessageParser } from '@/api'
import { FriendParser } from '@/nitro'

export class FriendListFragmentParser implements IMessageParser {
  private _totalFragments: number

  public get totalFragments(): number {
    return this._totalFragments
  }

  private _fragmentNumber: number

  public get fragmentNumber(): number {
    return this._fragmentNumber
  }

  private _fragment: FriendParser[]

  public get fragment(): FriendParser[] {
    return this._fragment
  }

  public flush(): boolean {
    this._totalFragments = 0
    this._fragmentNumber = 0
    this._fragment = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._totalFragments = wrapper.readInt()
    this._fragmentNumber = wrapper.readInt()

    let totalFriends = wrapper.readInt()

    while (totalFriends > 0) {
      this._fragment.push(new FriendParser(wrapper))

      totalFriends--
    }

    return true
  }
}
