import { IMessageDataWrapper, IMessageParser } from '@/api'

export class PetScratchFailedMessageParser implements IMessageParser {
  private _currentAge: number

  public get currentAge(): number {
    return this._currentAge
  }

  private _requiredAge: number

  public get requiredAge(): number {
    return this._requiredAge
  }

  flush(): boolean {
    this._currentAge = -1
    this._requiredAge = -1

    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._currentAge = wrapper.readInt()
    this._requiredAge = wrapper.readInt()

    return true
  }
}
