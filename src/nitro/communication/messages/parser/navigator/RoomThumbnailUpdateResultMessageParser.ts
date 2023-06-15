import { IMessageDataWrapper, IMessageParser } from '@/api'

export class RoomThumbnailUpdateResultMessageParser implements IMessageParser {
  private _flatId: number

  public get flatId(): number {
    return this._flatId
  }

  private _resultCode: number

  public get resultCode(): number {
    return this._resultCode
  }

  flush(): boolean {
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._flatId = wrapper.readInt()
    this._resultCode = wrapper.readInt()
    return true
  }

}
