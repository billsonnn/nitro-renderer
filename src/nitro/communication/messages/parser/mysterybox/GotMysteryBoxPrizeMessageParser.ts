import { IMessageDataWrapper, IMessageParser } from '@/api'

export class GotMysteryBoxPrizeMessageParser implements IMessageParser {
  private _contentType: string

  public get contentType(): string {
    return this._contentType
  }

  private _classId: number

  public get classId(): number {
    return this._classId
  }

  public flush(): boolean {
    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._contentType = wrapper.readString()
    this._classId = wrapper.readInt()

    return true
  }

}
