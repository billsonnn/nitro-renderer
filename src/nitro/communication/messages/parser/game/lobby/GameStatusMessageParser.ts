import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GameStatusMessageParser implements IMessageParser {
  private static readonly OK = 0
  private static readonly MAINTENANCE = 1
  private _status: number

  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  public get isOk(): boolean {
    return this._status == GameStatusMessageParser.OK
  }

  public get isInMaintenance(): boolean {
    return this._status == GameStatusMessageParser.MAINTENANCE
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    this._status = wrapper.readInt()

    return true
  }
}
