import { IMessageDataWrapper, IMessageParser, RoomControllerLevel } from '@/api'

export class RoomRightsParser implements IMessageParser {
  private _controllerLevel: number

  public get controllerLevel(): number {
    return this._controllerLevel
  }

  public flush(): boolean {
    this._controllerLevel = RoomControllerLevel.NONE

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._controllerLevel = wrapper.readInt()

    return true
  }
}
