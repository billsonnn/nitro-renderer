import { IMessageDataWrapper, IMessageParser } from '@/api'

export class YouArePlayingGameParser implements IMessageParser {
  private _isPlaying: boolean

  public get isPlaying(): boolean {
    return this._isPlaying
  }

  public flush(): boolean {
    this._isPlaying = false

    return true
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false

    this._isPlaying = wrapper.readBoolean()

    return true
  }
}
