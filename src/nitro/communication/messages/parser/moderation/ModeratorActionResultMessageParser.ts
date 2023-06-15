import { IMessageDataWrapper, IMessageParser } from '@/api'

export class ModeratorActionResultMessageParser implements IMessageParser {
  private _userId: number

  public get userId(): number {
    return this._userId
  }

  private _success: boolean

  public get success(): boolean {
    return this._success
  }

  public flush(): boolean {
    this._userId = -1
    this._success = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._userId = wrapper.readInt()
    this._success = wrapper.readBoolean()
    return true
  }
}
