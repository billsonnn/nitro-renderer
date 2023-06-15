import { NitroEvent } from '@/events'

export class NotifyPlayedSongEvent extends NitroEvent {
  public static readonly NOTIFY_PLAYED_SONG = 'UIEW_NOTIFY_PLAYED_SONG'

  constructor(name: string, creator: string) {
    super(NotifyPlayedSongEvent.NOTIFY_PLAYED_SONG)

    this._name = name
    this._creator = creator
  }

  private _name: string

  public get name(): string {
    return this._name
  }

  private _creator: string

  public get creator(): string {
    return this._creator
  }
}
