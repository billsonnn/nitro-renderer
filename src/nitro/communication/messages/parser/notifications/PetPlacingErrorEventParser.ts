import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetPlacingErrorEventParser implements IMessageParser {
  private _errorCode: number

  public get errorCode(): number {
    return this._errorCode
  }

  public flush(): boolean {
    this._errorCode = -1
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._errorCode = wrapper.readInt()

    return true
  }
}
