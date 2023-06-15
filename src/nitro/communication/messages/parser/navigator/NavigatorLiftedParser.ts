import { IMessageDataWrapper, IMessageParser } from '@/api'
import { NavigatorLiftedDataParser } from '@/nitro'

export class NavigatorLiftedParser implements IMessageParser {
  private _rooms: NavigatorLiftedDataParser[]

  public get rooms(): NavigatorLiftedDataParser[] {
    return this._rooms
  }

  public flush(): boolean {
    this._rooms = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    let totalRooms = wrapper.readInt()

    while (totalRooms > 0) {
      this._rooms.push(new NavigatorLiftedDataParser(wrapper))

      totalRooms--
    }

    return true
  }
}
