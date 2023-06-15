import { IMessageDataWrapper, IMessageParser } from '@/api'

export class DiceValueMessageParser implements IMessageParser {
  private _itemId: number

  public get itemId(): number {
    return this._itemId
  }

  private _value: number

  public get value(): number {
    return this._value
  }

  public flush(): boolean {
    this._itemId = 0
    this._value = 0

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._itemId = wrapper.readInt()
    this._value = wrapper.readInt()

    return true
  }
}
