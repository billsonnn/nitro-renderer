import { IMessageDataWrapper, IMessageParser } from '@/api'

export class MysteryBoxKeysParser implements IMessageParser {
  private _boxColor: string

  public get boxColor(): string {
    return this._boxColor
  }

  private _keyColor: string

  public get keyColor(): string {
    return this._keyColor
  }

  public flush(): boolean {
    this._boxColor = null
    this._keyColor = null

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._boxColor = wrapper.readString()
    this._keyColor = wrapper.readString()

    return true
  }
}
