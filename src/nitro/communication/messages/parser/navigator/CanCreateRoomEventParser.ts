import { IMessageDataWrapper, IMessageParser } from '@/api'

export class CanCreateRoomEventParser implements IMessageParser {
  private _canCreate: boolean

  public get canCreate(): boolean {
    return this._canCreate
  }

  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  public flush(): boolean {
    this._canCreate = false
    this._errorCode = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._canCreate = wrapper.readBoolean()
    this._errorCode = wrapper.readInt()

    return true
  }
}
