import { IMessageDataWrapper } from '@/api'
import { RoomDataParser } from '@/nitro'

export class NavigatorSearchResultList {
  constructor(wrapper: IMessageDataWrapper) {
    if (!wrapper) throw new Error('invalid_wrapper')

    this.flush()
    this.parse(wrapper)
  }

  private _code: string

  public get code(): string {
    return this._code
  }

  private _data: string

  public get data(): string {
    return this._data
  }

  private _action: number

  public get action(): number {
    return this._action
  }

  private _closed: boolean

  public get closed(): boolean {
    return this._closed
  }

  private _mode: number

  public get mode(): number {
    return this._mode
  }

  private _rooms: RoomDataParser[]

  public get rooms(): RoomDataParser[] {
    return this._rooms
  }

  public flush(): boolean {
    this._code = null
    this._data = null
    this._action = -1
    this._closed = false
    this._mode = -1
    this._rooms = []

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._code = wrapper.readString()
    this._data = wrapper.readString()
    this._action = wrapper.readInt()
    this._closed = wrapper.readBoolean()
    this._mode = wrapper.readInt()

    let totalRooms = wrapper.readInt()

    while (totalRooms > 0) {
      this._rooms.push(new RoomDataParser(wrapper))

      totalRooms--
    }

    return true
  }
}
