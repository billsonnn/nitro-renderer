import { IMessageDataWrapper, IMessageParser } from '@/api'

export class NowPlayingMessageParser implements IMessageParser {
  private _currentSongId: number

  public get currentSongId(): number {
    return this._currentSongId
  }

  private _currentPosition: number

  public get currentPosition(): number {
    return this._currentPosition
  }

  private _nextSongId: number

  public get nextSongId(): number {
    return this._nextSongId
  }

  private _nextPosition: number

  public get nextPosition(): number {
    return this._nextPosition
  }

  private _syncCount: number

  public get syncCount(): number {
    return this._syncCount
  }

  flush(): boolean {
    this._currentSongId = -1
    this._currentPosition = -1
    this._nextSongId = -1
    this._nextPosition = -1
    this._syncCount = -1
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._currentSongId = wrapper.readInt()
    this._currentPosition = wrapper.readInt()
    this._nextSongId = wrapper.readInt()
    this._nextPosition = wrapper.readInt()
    this._syncCount = wrapper.readInt()
    return true
  }

}
