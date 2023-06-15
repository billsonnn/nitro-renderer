import { IMessageDataWrapper, IMessageParser } from '@/api'

export class YoutubeControlVideoMessageParser implements IMessageParser {
  private _furniId: number

  public get furniId(): number {
    return this._furniId
  }

  private _commandId: number

  public get commandId(): number {
    return this._commandId
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    this._furniId = wrapper.readInt()
    this._commandId = wrapper.readInt()
    return true
  }

  public flush(): boolean {
    this._furniId = -1
    this._commandId = -1
    return true
  }
}
