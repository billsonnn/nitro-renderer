import { NitroEvent } from '@/events'

export class SongInfoReceivedEvent extends NitroEvent {
  public static readonly SIR_TRAX_SONG_INFO_RECEIVED = 'SIR_TRAX_SONG_INFO_RECEIVED'

  constructor(k: string, _arg_2: number) {
    super(k)
    this._id = _arg_2
  }

  private _id: number

  public get id(): number {
    return this._id
  }
}
