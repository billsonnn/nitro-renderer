import { NitroEvent } from '@/events'

export class NowPlayingEvent extends NitroEvent {
  public static readonly NPE_USER_PLAY_SONG = 'NPE_USER_PLAY_SONG'
  public static readonly NPW_USER_STOP_SONG = 'NPW_USER_STOP_SONG'
  public static readonly NPE_SONG_CHANGED = 'NPE_SONG_CHANGED'

  constructor(k: string, priority: number, id: number, position: number) {
    super(k)
    this._id = id
    this._position = position
    this._priority = priority
  }

  private _id: number

  public get id(): number {
    return this._id
  }

  private _position: number

  public get position(): number {
    return this._position
  }

  private _priority: number

  public get priority(): number {
    return this._priority
  }
}
