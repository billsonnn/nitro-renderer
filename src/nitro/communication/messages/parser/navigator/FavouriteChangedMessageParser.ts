import { IMessageDataWrapper, IMessageParser } from '@/api'

export class FavouriteChangedMessageParser implements IMessageParser {
  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _added: boolean

  public get added(): boolean {
    return this._added
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._flatId = wrapper.readInt()
    this._added = wrapper.readBoolean()

    return true
  }
}
