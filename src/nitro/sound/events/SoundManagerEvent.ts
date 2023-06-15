import { NitroEvent } from '@/events'

export class SoundManagerEvent extends NitroEvent {
  public static TRAX_SONG_COMPLETE: string = 'SME_TRAX_SONG_COMPLETE'

  constructor(type: string, id: number) {
    super(type)
    this._id = id
  }

  private _id: number

  public get id(): number {
    return this._id
  }
}
