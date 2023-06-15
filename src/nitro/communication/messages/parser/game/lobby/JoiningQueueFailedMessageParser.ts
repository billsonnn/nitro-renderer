import { IMessageDataWrapper, IMessageParser } from '@/api'

export class JoiningQueueFailedMessageParser implements IMessageParser {
  public static readonly DUPLICATE_MACHINEID = 1

  private _gameTypeId: number

  public get gameTypeId(): number {
    return this._gameTypeId
  }

  private _reason: number

  public get reason(): number {
    return this._reason
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._gameTypeId = wrapper.readInt()
    this._reason = wrapper.readInt()

    return true
  }
}
