import { IMessageDataWrapper, IMessageParser } from '@/api'

export class YoutubeDisplayVideoMessageParser implements IMessageParser {
  private _furniId: number

  public get furniId(): number {
    return this._furniId
  }

  private _videoId: string

  public get videoId(): string {
    return this._videoId
  }

  private _startAtSeconds: number

  public get startAtSeconds(): number {
    return this._startAtSeconds
  }

  private _endAtSeconds: number

  public get endAtSeconds(): number {
    return this._endAtSeconds
  }

  private _state: number

  public get state(): number {
    return this._state
  }

  flush(): boolean {
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._furniId = wrapper.readInt()
    this._videoId = wrapper.readString()
    this._startAtSeconds = wrapper.readInt()
    this._endAtSeconds = wrapper.readInt()
    this._state = wrapper.readInt()
    return true
  }
}
