import { IMessageDataWrapper, IMessageParser } from '@/api'
import { PlayListEntry } from '@/nitro'

export class PlayListMessageParser implements IMessageParser {
  private _playlist: PlayListEntry[]

  private _synchronizationCount: number

  public get synchronizationCount(): number {
    return this._synchronizationCount
  }

  public get playList(): PlayListEntry[] {
    return this._playlist
  }

  flush(): boolean {
    this._synchronizationCount = -1
    this._playlist = []
    return true
  }

  parse(wrapper: IMessageDataWrapper): boolean {
    this._synchronizationCount = wrapper.readInt()
    const count = wrapper.readInt()

    for (let i = 0; i < count; i++) {
      this._playlist.push(new PlayListEntry(
        wrapper.readInt(), wrapper.readInt(), wrapper.readString(), wrapper.readString()
      ))
    }
    return true
  }

}
